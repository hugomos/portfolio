import { db } from "@portfolio/db";
import { env } from "@portfolio/env/server";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { AuthenticationDBFactory } from "../authentication/infra/factory/db";
import { AuthenticationUseCaseFactory } from "../authentication/infra/factory/use-case";

const ACCESS_TOKEN_MAX_AGE = 60 * 15;
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30;

export async function register(app: FastifyInstance) {
	const typedApp = app.withTypeProvider<ZodTypeProvider>();

	const dbFactory = new AuthenticationDBFactory(db);
	const useCaseFactory = new AuthenticationUseCaseFactory(dbFactory);

	const isSecure = new URL(env.SERVER_URL).protocol === "https:";

	const cookieBase = {
		httpOnly: true,
		sameSite: isSecure ? ("none" as const) : ("lax" as const),
		secure: isSecure,
	};

	typedApp.post(
		"/identity/auth/sign-in",
		{
			config: {
				public: true,
				rateLimit: { max: 10, timeWindow: "15 minutes" },
			},
			schema: {
				description: "Sign in by email and password",
				tags: ["Authentication"],
				body: z.object({
					email: z.email(),
					password: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const output = await useCaseFactory.signIn.perform(request.input);
			if (output.isLeft()) {
				return reply.status(400).send({ message: output.value.message });
			}

			const { userId } = output.value;

			const [jwtToken, refreshOutput] = await Promise.all([
				reply.jwtSign({ sub: userId }),
				useCaseFactory.issueRefreshToken.perform({ userId }),
			]);

			if (refreshOutput.isLeft()) {
				return reply.status(500).send({ message: "Failed to issue session" });
			}

			reply
				.setCookie("token", jwtToken, {
					...cookieBase,
					path: "/",
					maxAge: ACCESS_TOKEN_MAX_AGE,
				})
				.setCookie("refreshToken", refreshOutput.value.token, {
					...cookieBase,
					path: "/api/identity/auth",
					maxAge: REFRESH_TOKEN_MAX_AGE,
				});

			return reply.status(204).send();
		},
	);

	typedApp.post(
		"/identity/auth/refresh",
		{
			config: {
				public: true,
				rateLimit: { max: 20, timeWindow: "15 minutes" },
			},
			schema: {
				description: "Refresh access token",
				tags: ["Authentication"],
			},
		},
		async (request, reply) => {
			const refreshToken = request.cookies.refreshToken;

			if (!refreshToken) {
				return reply.status(401).send({ message: "Missing refresh token" });
			}

			const output = await useCaseFactory.refreshToken.perform({
				token: refreshToken,
			});

			if (output.isLeft()) {
				return reply.status(401).send({ message: output.value.message });
			}

			const { userId, token: newRefreshToken } = output.value;
			const jwtToken = await reply.jwtSign({ sub: userId });

			reply
				.setCookie("token", jwtToken, {
					...cookieBase,
					path: "/",
					maxAge: ACCESS_TOKEN_MAX_AGE,
				})
				.setCookie("refreshToken", newRefreshToken, {
					...cookieBase,
					path: "/api/identity/auth",
					maxAge: REFRESH_TOKEN_MAX_AGE,
				});

			return reply.status(204).send();
		},
	);

	typedApp.post(
		"/identity/auth/sign-out",
		{
			config: { public: true },
			schema: {
				description: "Sign out user",
				tags: ["Authentication"],
			},
		},
		async (request, reply) => {
			const refreshToken = request.cookies.refreshToken;

			if (refreshToken) {
				await useCaseFactory.signOut.perform({ token: refreshToken });
			}

			reply
				.clearCookie("token", { ...cookieBase, path: "/" })
				.clearCookie("refreshToken", {
					...cookieBase,
					path: "/api/identity/auth",
				});

			return reply.code(204).send();
		},
	);
}

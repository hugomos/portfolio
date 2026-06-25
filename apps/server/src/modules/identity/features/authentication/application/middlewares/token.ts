import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const tokenMiddleware = fp(async (app: FastifyInstance) => {
	app.addHook("preHandler", async (request) => {
		if (request.routeOptions.config.public) return;
		if (request.url.startsWith("/api/docs")) return;

		const { sub: id } = await request.jwtVerify<{
			sub: string;
		}>();

		request.getCurrentUser = () => ({ id });
	});
});

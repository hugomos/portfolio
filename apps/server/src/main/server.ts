import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyJwt from "@fastify/jwt";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import { env } from "@portfolio/env/server";
import fastifyApiReference from "@scalar/fastify-api-reference";
import fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { requestInputMiddleware } from "@/infra/http/middleware/request-input";
import { logger } from "@/infra/logger";
import { tokenMiddleware } from "@/modules/identity/features/authentication/application/middlewares/token";

export async function bootstrap() {
	const app = fastify({
		loggerInstance: logger,
		bodyLimit: 1_048_576,
	}).withTypeProvider<ZodTypeProvider>();

	app.setSerializerCompiler(serializerCompiler);
	app.setValidatorCompiler(validatorCompiler);

	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "Portfolio API",
				description: "API do portfólio",
				version: "1.0.0",
			},
		},
		transform: jsonSchemaTransform,
	});

	app.register(fastifyApiReference, { routePrefix: "/api/docs" });

	app.register(fastifyHelmet, { contentSecurityPolicy: false });

	app.register(fastifyCors, {
		origin: env.CORS_ORIGIN,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
		maxAge: 86400,
	});

	app.register(fastifyRateLimit, { global: false });

	app.register(fastifyCookie);

	app.register(fastifyJwt, {
		secret: env.JWT_SECRET,
		cookie: {
			cookieName: "token",
			signed: false,
		},
	});

	await app.register(requestInputMiddleware);
	await app.register(tokenMiddleware);

	app.get("/health", async (_request, reply) => {
		return reply.status(200).send({ status: "ok" });
	});

	await app.ready();
	await app
		.listen({ port: env.PORT, host: "0.0.0.0" })
		.then(() => {
			logger.info(`SERVER STARTED ON PORT ${env.PORT}`);
		})
		.catch((err) => {
			logger.error(err);
			process.exit(1);
		});
}

void bootstrap();

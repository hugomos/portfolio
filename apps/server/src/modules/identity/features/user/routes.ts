import { db } from "@portfolio/db";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { UserDBFactory } from "../user/infra/factory/db";
import { UserUseCaseFactory } from "../user/infra/factory/use-case";
import { UserControllerFactory } from "./infra/factory/controller";

export async function register(app: FastifyInstance) {
	const typedApp = app.withTypeProvider<ZodTypeProvider>();

	const dbFactory = new UserDBFactory(db);
	const useCaseFactory = new UserUseCaseFactory(dbFactory);
	const controllerFactory = new UserControllerFactory(useCaseFactory);

	typedApp.post(
		"/identity/user/me",
		{
			schema: {
				description: "Get current user",
				tags: ["User"],
			},
		},
		async (request, reply) => {
			const { id } = request.getCurrentUser();
			return controllerFactory.me.handle(reply, {
				userId: id,
				...request.input,
			});
		},
	);
}

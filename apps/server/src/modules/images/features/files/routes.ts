import { db } from "@portfolio/db";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { adapterFactory } from "@/infra/adapter-factory";
import { FilesControllerFactory } from "./infra/factory/controller";
import { FilesDBFactory } from "./infra/factory/db";
import { FilesUseCaseFactory } from "./infra/factory/use-case";

export async function register(app: FastifyInstance) {
	const typedApp = app.withTypeProvider<ZodTypeProvider>();

	const dbFactory = new FilesDBFactory(db);
	const useCaseFactory = new FilesUseCaseFactory(dbFactory, adapterFactory.upload());
	const controllerFactory = new FilesControllerFactory(useCaseFactory);

	typedApp.post(
		"/files",
		{
			schema: {
				description: "Register a file after upload",
				tags: ["Files"],
				body: z.object({
					name: z.string().min(1),
					keyname: z.string().min(1),
					contentType: z.string().min(1),
					publicUrl: z.string().url(),
				}),
				response: { 200: z.object({ id: z.string() }) },
			},
		},
		async (request, reply) => {
			return controllerFactory.registerFile.handle(reply, request.input);
		},
	);

	typedApp.delete(
		"/files/:id",
		{
			schema: {
				description: "Delete a file and remove from storage",
				tags: ["Files"],
				params: z.object({ id: z.string() }),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.deleteFile.handle(reply, request.input);
		},
	);
}

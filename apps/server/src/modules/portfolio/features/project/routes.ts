import { db } from "@portfolio/db";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { ProjectControllerFactory } from "./infra/factory/controller";
import { ProjectDBFactory } from "./infra/factory/db";
import { ProjectUseCaseFactory } from "./infra/factory/use-case";

const categorySchema = z.enum([
	"fullstack",
	"frontend",
	"backend",
	"cli",
	"mobile",
]);
const statusSchema = z.enum(["active", "wip", "archived"]);

const projectSchema = z.object({
	id: z.string(),
	title: z.string(),
	slug: z.string(),
	summary: z.string(),
	impact: z.string().nullable(),
	content: z.string().nullable(),
	category: categorySchema,
	status: statusSchema,
	repositoryUrl: z.string().nullable(),
	liveUrl: z.string().nullable(),
	visible: z.boolean(),
	highlights: z.array(
		z.object({
			content: z.string(),
			sortOrder: z.number(),
		}),
	),
	techs: z.array(
		z.object({
			name: z.string(),
			sortOrder: z.number(),
		}),
	),
});

const projectBodySchema = z.object({
	title: z.string().min(1),
	summary: z.string().min(1),
	impact: z.string().nullable().optional(),
	content: z.string().nullable().optional(),
	category: categorySchema,
	status: statusSchema,
	repositoryUrl: z.string().url().nullable().optional(),
	liveUrl: z.string().url().nullable().optional(),
	visible: z.boolean().optional(),
});

export async function register(app: FastifyInstance) {
	const typedApp = app.withTypeProvider<ZodTypeProvider>();

	const dbFactory = new ProjectDBFactory(db);
	const useCaseFactory = new ProjectUseCaseFactory(dbFactory);
	const controllerFactory = new ProjectControllerFactory(useCaseFactory);

	typedApp.get(
		"/portfolio/projects",
		{
			config: { public: true },
			schema: {
				description: "List projects",
				tags: ["Project"],
				response: { 200: z.array(projectSchema) },
			},
		},
		async (_, reply) => {
			return controllerFactory.listProjects.handle(reply);
		},
	);

	typedApp.post(
		"/portfolio/projects",
		{
			schema: {
				description: "Create project",
				tags: ["Project"],
				body: projectBodySchema,
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.createProject.handle(reply, request.input);
		},
	);

	typedApp.put(
		"/portfolio/projects/:id",
		{
			schema: {
				description: "Update project",
				tags: ["Project"],
				params: z.object({ id: z.string() }),
				body: projectBodySchema.omit({ visible: true }),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.updateProject.handle(reply, request.input);
		},
	);

	typedApp.patch(
		"/portfolio/projects/:id/toggle-active",
		{
			schema: {
				description: "Toggle project visibility",
				tags: ["Project"],
				params: z.object({ id: z.string() }),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.toggleActive.handle(reply, request.input);
		},
	);

	typedApp.put(
		"/portfolio/projects/:id/highlights",
		{
			schema: {
				description: "Replace project highlights",
				tags: ["Project"],
				params: z.object({ id: z.string() }),
				body: z.object({
					highlights: z.array(
						z.object({
							content: z.string().min(1),
							sortOrder: z.number().int().min(0),
						}),
					),
				}),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.replaceHighlights.handle(reply, request.input);
		},
	);

	typedApp.put(
		"/portfolio/projects/:id/techs",
		{
			schema: {
				description: "Replace project techs",
				tags: ["Project"],
				params: z.object({ id: z.string() }),
				body: z.object({
					techs: z.array(
						z.object({
							name: z.string().min(1),
							sortOrder: z.number().int().min(0),
						}),
					),
				}),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.replaceTechs.handle(reply, request.input);
		},
	);

	typedApp.delete(
		"/portfolio/projects/:id",
		{
			schema: {
				description: "Delete project",
				tags: ["Project"],
				params: z.object({ id: z.string() }),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.deleteProject.handle(reply, request.input);
		},
	);
}

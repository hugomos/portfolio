import { db } from "@portfolio/db";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { adapterFactory } from "@/infra/adapter-factory";
import { triggerRevalidation } from "@/infra/http/revalidate";
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
const socialPlatformSchema = z.enum([
	"instagram",
	"x",
	"linkedin",
	"github",
	"youtube",
	"tiktok",
]);

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
	coverImageUrl: z.string().nullable(),
	coverImageFileId: z.string().nullable(),
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
	socialLinks: z.array(
		z.object({
			platform: socialPlatformSchema,
			username: z.string(),
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
	coverImageUrl: z.string().nullable().optional(),
	coverImageFileId: z.string().nullable().optional(),
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

	typedApp.get(
		"/portfolio/projects/upload-url",
		{
			schema: {
				description: "Get presigned upload URL for cover image",
				tags: ["Project"],
				querystring: z.object({
					filename: z.string().min(1),
					contentType: z.string().min(1),
				}),
				response: {
					200: z.object({
						uploadUrl: z.string(),
						publicUrl: z.string(),
						keyname: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { filename, contentType } = request.query;
			const result = await adapterFactory.upload().getUploadUrl({ filename, contentType });
			return reply.send(result);
		},
	);

	typedApp.post(
		"/portfolio/projects",
		{
			schema: {
				description: "Create project",
				tags: ["Project"],
				body: projectBodySchema,
				response: { 200: z.object({ id: z.string() }) },
			},
		},
		async (request, reply) => {
			const result = await controllerFactory.createProject.handle(reply, request.input);
			void triggerRevalidation();
			return result;
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
			const result = await controllerFactory.updateProject.handle(reply, request.input);
			void triggerRevalidation();
			return result;
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
			const result = await controllerFactory.toggleActive.handle(reply, request.input);
			void triggerRevalidation();
			return result;
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
			const result = await controllerFactory.replaceHighlights.handle(reply, request.input);
			void triggerRevalidation();
			return result;
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
			const result = await controllerFactory.replaceTechs.handle(reply, request.input);
			void triggerRevalidation();
			return result;
		},
	);

	typedApp.put(
		"/portfolio/projects/:id/social-links",
		{
			schema: {
				description: "Replace project social links",
				tags: ["Project"],
				params: z.object({ id: z.string() }),
				body: z.object({
					socialLinks: z.array(
						z.object({
							platform: socialPlatformSchema,
							username: z.string().min(1),
							sortOrder: z.number().int().min(0),
						}),
					),
				}),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			const result = await controllerFactory.replaceSocialLinks.handle(reply, request.input);
			void triggerRevalidation();
			return result;
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
			const result = await controllerFactory.deleteProject.handle(reply, request.input);
			void triggerRevalidation();
			return result;
		},
	);
}

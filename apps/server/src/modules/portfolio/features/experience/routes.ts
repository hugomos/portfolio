import { db } from "@portfolio/db";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { ExperienceControllerFactory } from "./infra/factory/controller";
import { ExperienceDBFactory } from "./infra/factory/db";
import { ExperienceUseCaseFactory } from "./infra/factory/use-case";

const workModeSchema = z.enum(["remote", "hybrid", "onsite"]);

const experienceSchema = z.object({
	id: z.string(),
	role: z.string(),
	workMode: workModeSchema,
	startDate: z.string(),
	endDate: z.string().nullable(),
	visible: z.boolean(),
	company: z.object({
		id: z.string(),
		name: z.string(),
		website: z.string().nullable(),
	}),
	highlights: z.array(
		z.object({
			content: z.string(),
			sortOrder: z.number(),
		}),
	),
});

export async function register(app: FastifyInstance) {
	const typedApp = app.withTypeProvider<ZodTypeProvider>();

	const dbFactory = new ExperienceDBFactory(db);
	const useCaseFactory = new ExperienceUseCaseFactory(dbFactory);
	const controllerFactory = new ExperienceControllerFactory(useCaseFactory);

	// ── Experiences ──────────────────────────────────────────────────────────

	typedApp.get(
		"/portfolio/experiences",
		{
			config: { public: true },
			schema: {
				description: "List experiences",
				tags: ["Experience"],
				response: { 200: z.array(experienceSchema) },
			},
		},
		async (_, reply) => {
			return controllerFactory.listExperiences.handle(reply);
		},
	);

	typedApp.post(
		"/portfolio/experiences",
		{
			schema: {
				description: "Create experience",
				tags: ["Experience"],
				body: z.object({
					companyId: z.string(),
					role: z.string().min(1),
					workMode: workModeSchema,
					startDate: z.string().min(1),
					endDate: z.string().nullable().optional(),
					visible: z.boolean().optional(),
				}),
				response: { 200: z.object({ id: z.string() }) },
			},
		},
		async (request, reply) => {
			return controllerFactory.createExperience.handle(reply, request.input);
		},
	);

	typedApp.put(
		"/portfolio/experiences/:id",
		{
			schema: {
				description: "Update experience",
				tags: ["Experience"],
				params: z.object({ id: z.string() }),
				body: z.object({
					companyId: z.string(),
					role: z.string().min(1),
					workMode: workModeSchema,
					startDate: z.string().min(1),
					endDate: z.string().nullable().optional(),
				}),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.updateExperience.handle(reply, request.input);
		},
	);

	typedApp.patch(
		"/portfolio/experiences/:id/toggle-active",
		{
			schema: {
				description: "Toggle experience visibility",
				tags: ["Experience"],
				params: z.object({ id: z.string() }),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.toggleActive.handle(reply, request.input);
		},
	);

	typedApp.put(
		"/portfolio/experiences/:id/highlights",
		{
			schema: {
				description: "Replace experience highlights",
				tags: ["Experience"],
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

	typedApp.delete(
		"/portfolio/experiences/:id",
		{
			schema: {
				description: "Delete experience",
				tags: ["Experience"],
				params: z.object({ id: z.string() }),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.deleteExperience.handle(reply, request.input);
		},
	);

	// ── Companies ─────────────────────────────────────────────────────────────

	typedApp.get(
		"/portfolio/companies",
		{
			schema: {
				description: "List companies",
				tags: ["Company"],
				response: {
					200: z.array(
						z.object({
							id: z.string(),
							name: z.string(),
							website: z.string().nullable(),
						}),
					),
				},
			},
		},
		async (_, reply) => {
			return controllerFactory.listCompanies.handle(reply);
		},
	);

	typedApp.post(
		"/portfolio/companies",
		{
			schema: {
				description: "Create company",
				tags: ["Company"],
				body: z.object({
					name: z.string().min(1),
					website: z.string().url().nullable().optional(),
				}),
				response: {
					200: z.object({ id: z.string() }),
				},
			},
		},
		async (request, reply) => {
			return controllerFactory.createCompany.handle(reply, request.input);
		},
	);

	typedApp.put(
		"/portfolio/companies/:id",
		{
			schema: {
				description: "Update company",
				tags: ["Company"],
				params: z.object({ id: z.string() }),
				body: z.object({
					name: z.string().min(1),
					website: z.string().url().nullable().optional(),
				}),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.updateCompany.handle(reply, request.input);
		},
	);
}

import { db } from "@portfolio/db";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { HeroControllerFactory } from "../hero/infra/factory/controller";
import { HeroDBFactory } from "../hero/infra/factory/db";
import { HeroUseCaseFactory } from "../hero/infra/factory/use-case";

export async function register(app: FastifyInstance) {
	const typedApp = app.withTypeProvider<ZodTypeProvider>();

	const dbFactory = new HeroDBFactory(db);
	const useCaseFactory = new HeroUseCaseFactory(dbFactory);
	const controllerFactory = new HeroControllerFactory(useCaseFactory);

	typedApp.get(
		"/portfolio/hero",
		{
			config: {
				public: true,
			},
			schema: {
				description: "Get hero",
				tags: ["Hero"],
				response: {
					200: z.object({
						id: z.string(),
						name: z.string(),
						title: z.string(),
						bio: z.string(),
						resumeUrl: z.string().nullable(),
						githubUrl: z.string().nullable(),
						linkedinUrl: z.string().nullable(),
						skills: z.array(
							z.object({
								name: z.string(),
								sortOrder: z.number(),
							}),
						),
					}),
				},
			},
		},
		async (_, reply) => {
			return controllerFactory.getHero.handle(reply);
		},
	);

	typedApp.put(
		"/portfolio/hero",
		{
			schema: {
				description: "Update hero",
				tags: ["Hero"],
				body: z.object({
					name: z.string().min(1),
					title: z.string().min(1),
					bio: z.string().min(1),
					resumeUrl: z.string().nullable().optional(),
					githubUrl: z.string().nullable().optional(),
					linkedinUrl: z.string().nullable().optional(),
				}),
				response: { 204: z.never() },
			},
		},
		async (request, reply) => {
			return controllerFactory.updateHero.handle(reply, request.input);
		},
	);

	typedApp.put(
		"/portfolio/hero/skills",
		{
			schema: {
				description: "Replace hero skills",
				tags: ["Hero"],
				body: z.object({
					skills: z.array(
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
			return controllerFactory.replaceSkills.handle(reply, request.input);
		},
	);
}

import type { Db } from "@portfolio/db";
import { eq } from "@portfolio/db/orm/drizzle-orm";
import {
	projectHighlight as projectHighlightTable,
	project as projectTable,
	projectTech as projectTechTable,
} from "@portfolio/db/schema";
import { Project } from "@/modules/portfolio/domain/entity/project";
import { ProjectHighlight } from "@/modules/portfolio/domain/entity/project-highlight";
import { ProjectTech } from "@/modules/portfolio/domain/entity/project-tech";
import type { ProjectRepo } from "../../application/db/repository";

export class ProjectRepoDB implements ProjectRepo {
	constructor(private readonly connection: Db) {}

	async findById(id: string): Promise<Project | null> {
		const record = await this.connection.query.project.findFirst({
			where: eq(projectTable.id, id),
			with: { highlights: true, tech: true },
		});

		if (!record) return null;

		return this.toEntity(record);
	}

	async findBySlug(slug: string): Promise<Project | null> {
		const record = await this.connection.query.project.findFirst({
			where: eq(projectTable.slug, slug),
			with: { highlights: true, tech: true },
		});

		if (!record) return null;

		return this.toEntity(record);
	}

	async list(): Promise<Project[]> {
		const records = await this.connection.query.project.findMany({
			with: { highlights: true, tech: true },
		});

		return records.map((record) => this.toEntity(record));
	}

	async create(project: Project): Promise<void> {
		await this.connection.insert(projectTable).values({
			id: project.id,
			title: project.title,
			slug: project.slug,
			summary: project.summary,
			impact: project.impact,
			content: project.content,
			category: project.category,
			status: project.status,
			repositoryUrl: project.repositoryUrl,
			liveUrl: project.liveUrl,
			visible: project.visible,
			createdAt: project.createdAt.toISOString(),
			updatedAt: project.updatedAt.toISOString(),
		});
	}

	async update(project: Project): Promise<void> {
		await this.connection
			.update(projectTable)
			.set({
				title: project.title,
				slug: project.slug,
				summary: project.summary,
				impact: project.impact,
				content: project.content,
				category: project.category,
				status: project.status,
				repositoryUrl: project.repositoryUrl,
				liveUrl: project.liveUrl,
				visible: project.visible,
				updatedAt: project.updatedAt.toISOString(),
			})
			.where(eq(projectTable.id, project.id));
	}

	async delete(id: string): Promise<void> {
		await this.connection.delete(projectTable).where(eq(projectTable.id, id));
	}

	async replaceHighlights(
		projectId: string,
		highlights: ProjectHighlight[],
	): Promise<void> {
		await this.connection.transaction(async (tx) => {
			await tx
				.delete(projectHighlightTable)
				.where(eq(projectHighlightTable.projectId, projectId));

			if (highlights.length > 0) {
				await tx.insert(projectHighlightTable).values(
					highlights.map((h) => ({
						id: h.id,
						projectId: h.projectId,
						content: h.content,
						sortOrder: h.sortOrder,
					})),
				);
			}
		});
	}

	async replaceTechs(projectId: string, techs: ProjectTech[]): Promise<void> {
		await this.connection.transaction(async (tx) => {
			await tx
				.delete(projectTechTable)
				.where(eq(projectTechTable.projectId, projectId));

			if (techs.length > 0) {
				await tx.insert(projectTechTable).values(
					techs.map((t) => ({
						id: t.id,
						projectId: t.projectId,
						name: t.name,
						sortOrder: t.sortOrder,
					})),
				);
			}
		});
	}

	private toEntity(
		record: typeof projectTable.$inferSelect & {
			highlights: (typeof projectHighlightTable.$inferSelect)[];
			tech: (typeof projectTechTable.$inferSelect)[];
		},
	): Project {
		return Project.restore({
			id: record.id,
			title: record.title,
			slug: record.slug,
			summary: record.summary,
			impact: record.impact,
			content: record.content,
			category: record.category,
			status: record.status,
			repositoryUrl: record.repositoryUrl,
			liveUrl: record.liveUrl,
			visible: record.visible,
			createdAt: new Date(record.createdAt),
			updatedAt: new Date(record.updatedAt),
			highlights: record.highlights
				.sort((a, b) => a.sortOrder - b.sortOrder)
				.map((h) => ProjectHighlight.restore(h)),
			techs: record.tech
				.sort((a, b) => a.sortOrder - b.sortOrder)
				.map((t) => ProjectTech.restore(t)),
		});
	}
}

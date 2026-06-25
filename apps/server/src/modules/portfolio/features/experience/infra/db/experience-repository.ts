import type { Db } from "@portfolio/db";
import { eq } from "@portfolio/db/orm/drizzle-orm";
import {
	experienceHighlight as experienceHighlightTable,
	experience as experienceTable,
} from "@portfolio/db/schema";
import { Company } from "@/modules/portfolio/domain/entity/company";
import { Experience } from "@/modules/portfolio/domain/entity/experience";
import { ExperienceHighlight } from "@/modules/portfolio/domain/entity/experience-highlight";
import type { ExperienceRepo } from "../../application/db/repository";

export class ExperienceRepoDB implements ExperienceRepo {
	constructor(private readonly connection: Db) {}

	async findById(id: string): Promise<Experience | null> {
		const record = await this.connection.query.experience.findFirst({
			where: eq(experienceTable.id, id),
			with: { company: true, highlights: true },
		});

		if (!record) return null;

		return Experience.restore({
			id: record.id,
			companyId: record.companyId,
			role: record.role,
			workMode: record.workMode,
			startDate: record.startDate,
			endDate: record.endDate,
			visible: record.visible,
			createdAt: new Date(record.createdAt),
			updatedAt: new Date(record.updatedAt),
			highlights: record.highlights
				.sort((a, b) => a.sortOrder - b.sortOrder)
				.map((h) => ExperienceHighlight.restore(h)),
			company: Company.restore(record.company),
		});
	}

	async list(): Promise<Experience[]> {
		const records = await this.connection.query.experience.findMany({
			with: { company: true, highlights: true },
		});

		return records.map((record) =>
			Experience.restore({
				id: record.id,
				companyId: record.companyId,
				role: record.role,
				workMode: record.workMode,
				startDate: record.startDate,
				endDate: record.endDate,
				visible: record.visible,
				createdAt: new Date(record.createdAt),
				updatedAt: new Date(record.updatedAt),
				highlights: record.highlights
					.sort((a, b) => a.sortOrder - b.sortOrder)
					.map((h) => ExperienceHighlight.restore(h)),
				company: Company.restore(record.company),
			}),
		);
	}

	async create(experience: Experience): Promise<void> {
		await this.connection.insert(experienceTable).values({
			id: experience.id,
			companyId: experience.companyId,
			role: experience.role,
			workMode: experience.workMode,
			startDate: experience.startDate,
			endDate: experience.endDate,
			visible: experience.visible,
			createdAt: experience.createdAt.toISOString(),
			updatedAt: experience.updatedAt.toISOString(),
		});
	}

	async update(experience: Experience): Promise<void> {
		await this.connection
			.update(experienceTable)
			.set({
				companyId: experience.companyId,
				role: experience.role,
				workMode: experience.workMode,
				startDate: experience.startDate,
				endDate: experience.endDate,
				visible: experience.visible,
				updatedAt: experience.updatedAt.toISOString(),
			})
			.where(eq(experienceTable.id, experience.id));
	}

	async delete(id: string): Promise<void> {
		await this.connection
			.delete(experienceTable)
			.where(eq(experienceTable.id, id));
	}

	async replaceHighlights(
		experienceId: string,
		highlights: ExperienceHighlight[],
	): Promise<void> {
		await this.connection.transaction(async (tx) => {
			await tx
				.delete(experienceHighlightTable)
				.where(eq(experienceHighlightTable.experienceId, experienceId));

			if (highlights.length > 0) {
				await tx.insert(experienceHighlightTable).values(
					highlights.map((h) => ({
						id: h.id,
						experienceId: h.experienceId,
						content: h.content,
						sortOrder: h.sortOrder,
					})),
				);
			}
		});
	}
}

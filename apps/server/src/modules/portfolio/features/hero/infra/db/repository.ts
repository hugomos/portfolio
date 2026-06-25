import type { Db } from "@portfolio/db";
import { eq } from "@portfolio/db/orm/drizzle-orm";
import { hero as heroTable, skill as skillTable } from "@portfolio/db/schema";
import { Hero } from "@/modules/portfolio/domain/entity/hero";
import { Skill } from "@/modules/portfolio/domain/entity/skill";
import type { HeroRepo } from "../../application/db/repository";

export class HeroRepoDB implements HeroRepo {
	constructor(private readonly connection: Db) {}

	async find(): Promise<Hero | null> {
		const record = await this.connection.query.hero.findFirst({
			with: { skills: true },
		});

		if (!record) return null;

		return Hero.restore({
			id: record.id,
			name: record.name,
			title: record.title,
			bio: record.bio,
			resumeUrl: record.resumeUrl,
			githubUrl: record.githubUrl,
			linkedinUrl: record.linkedinUrl,
			updatedAt: new Date(record.updatedAt),
			skills: record.skills
				.sort((a, b) => a.sortOrder - b.sortOrder)
				.map((s) => Skill.restore(s)),
		});
	}

	async create(hero: Hero): Promise<void> {
		await this.connection.insert(heroTable).values({
			id: hero.id,
			name: hero.name,
			title: hero.title,
			bio: hero.bio,
			resumeUrl: hero.resumeUrl,
			githubUrl: hero.githubUrl,
			linkedinUrl: hero.linkedinUrl,
			updatedAt: hero.updatedAt.toISOString(),
		});
	}

	async update(hero: Hero): Promise<void> {
		await this.connection
			.update(heroTable)
			.set({
				name: hero.name,
				title: hero.title,
				bio: hero.bio,
				resumeUrl: hero.resumeUrl,
				githubUrl: hero.githubUrl,
				linkedinUrl: hero.linkedinUrl,
				updatedAt: hero.updatedAt.toISOString(),
			})
			.where(eq(heroTable.id, hero.id));
	}

	async replaceSkills(heroId: string, skills: Skill[]): Promise<void> {
		await this.connection.transaction(async (tx) => {
			await tx.delete(skillTable).where(eq(skillTable.heroId, heroId));

			if (skills.length > 0) {
				await tx.insert(skillTable).values(
					skills.map((s) => ({
						id: s.id,
						heroId: s.heroId,
						name: s.name,
						sortOrder: s.sortOrder,
					})),
				);
			}
		});
	}
}

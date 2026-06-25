import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import { Hero } from "@/modules/portfolio/domain/entity/hero";
import type { HeroRepo } from "../db/repository";

type Input = {
	name: string;
	title: string;
	bio: string;
	resumeUrl?: string | null;
	githubUrl?: string | null;
	linkedinUrl?: string | null;
};

export class UpdateHeroUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: HeroRepo) {
		super();
	}

	async execute({
		name,
		title,
		bio,
		resumeUrl,
		githubUrl,
		linkedinUrl,
	}: Input): Promise<void> {
		const hero = await this.repo.find();
		if (!hero) throw new DomainError("Hero not found");

		const updated = Hero.restore({
			id: hero.id,
			name,
			title,
			bio,
			resumeUrl: resumeUrl ?? null,
			githubUrl: githubUrl ?? null,
			linkedinUrl: linkedinUrl ?? null,
			updatedAt: new Date(),
			skills: hero.skills,
		});

		await this.repo.update(updated);
	}
}

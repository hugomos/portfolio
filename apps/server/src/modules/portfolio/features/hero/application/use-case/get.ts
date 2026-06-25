import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import type { HeroRepo } from "../db/repository";

type Output = {
	id: string;
	name: string;
	title: string;
	bio: string;
	resumeUrl: string | null;
	githubUrl: string | null;
	linkedinUrl: string | null;
	skills: Array<{ name: string; sortOrder: number }>;
};

export class GetHeroUseCase extends UseCase<void, Output> {
	constructor(private readonly repo: HeroRepo) {
		super();
	}

	async execute() {
		const hero = await this.repo.find();
		if (!hero) throw new DomainError("Hero not found");
		return {
			id: hero.id,
			name: hero.name,
			title: hero.title,
			bio: hero.bio,
			resumeUrl: hero.resumeUrl,
			githubUrl: hero.githubUrl,
			linkedinUrl: hero.linkedinUrl,
			skills: hero.skills.map(({ name, sortOrder }) => ({ name, sortOrder })),
		};
	}
}

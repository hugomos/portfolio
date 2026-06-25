import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import { Skill } from "@/modules/portfolio/domain/entity/skill";
import type { HeroRepo } from "../db/repository";

type Input = {
	skills: Array<{ name: string; sortOrder: number }>;
};

export class ReplaceSkillsUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: HeroRepo) {
		super();
	}

	async execute({ skills }: Input): Promise<void> {
		const hero = await this.repo.find();
		if (!hero) throw new DomainError("Hero not found");

		const newSkills = skills.map(({ name, sortOrder }) =>
			Skill.create({ heroId: hero.id, name, sortOrder }),
		);

		await this.repo.replaceSkills(hero.id, newSkills);
	}
}

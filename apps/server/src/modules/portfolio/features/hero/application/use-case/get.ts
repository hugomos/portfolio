import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import type { Hero } from "@/modules/portfolio/domain/entity/hero";
import type { HeroRepo } from "../db/repository";

export class GetHeroUseCase extends UseCase<void, Hero> {
	constructor(private readonly repo: HeroRepo) {
		super();
	}

	async execute(): Promise<Hero> {
		const hero = await this.repo.find();
		if (!hero) throw new DomainError("Hero not found");
		return hero;
	}
}

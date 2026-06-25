import { GetHeroUseCase } from "../../application/use-case/get";
import { ReplaceSkillsUseCase } from "../../application/use-case/replace-skills";
import { UpdateHeroUseCase } from "../../application/use-case/update";
import type { HeroRepoDB } from "../db/repository";
import type { HeroDBFactory } from "./db";

export class HeroUseCaseFactory {
	private readonly repo: HeroRepoDB;

	constructor(db: HeroDBFactory) {
		this.repo = db.heroRepo;
	}

	get getHero() {
		return new GetHeroUseCase(this.repo);
	}

	get updateHero() {
		return new UpdateHeroUseCase(this.repo);
	}

	get replaceSkills() {
		return new ReplaceSkillsUseCase(this.repo);
	}
}

import { HttpController } from "@/infra/http/controller";
import type { HeroUseCaseFactory } from "./use-case";

export class HeroControllerFactory {
	constructor(private readonly useCaseFactory: HeroUseCaseFactory) {}

	get getHero() {
		return new HttpController(this.useCaseFactory.getHero);
	}

	get updateHero() {
		return new HttpController(this.useCaseFactory.updateHero);
	}

	get replaceSkills() {
		return new HttpController(this.useCaseFactory.replaceSkills);
	}
}

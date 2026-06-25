import type { Hero } from "@/modules/portfolio/domain/entity/hero";
import type { Skill } from "@/modules/portfolio/domain/entity/skill";

export interface HeroRepo {
	find(): Promise<Hero | null>;
	create(hero: Hero): Promise<void>;
	update(hero: Hero): Promise<void>;
	replaceSkills(heroId: string, skills: Skill[]): Promise<void>;
}

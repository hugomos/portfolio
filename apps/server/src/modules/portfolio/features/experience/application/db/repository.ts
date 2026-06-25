import type { Company } from "@/modules/portfolio/domain/entity/company";
import type { Experience } from "@/modules/portfolio/domain/entity/experience";
import type { ExperienceHighlight } from "@/modules/portfolio/domain/entity/experience-highlight";

export interface ExperienceRepo {
	findById(id: string): Promise<Experience | null>;
	list(): Promise<Experience[]>;
	create(experience: Experience): Promise<void>;
	update(experience: Experience): Promise<void>;
	delete(id: string): Promise<void>;
	replaceHighlights(
		experienceId: string,
		highlights: ExperienceHighlight[],
	): Promise<void>;
}

export interface CompanyRepo {
	findById(id: string): Promise<Company | null>;
	list(): Promise<Company[]>;
	create(company: Company): Promise<void>;
	update(company: Company): Promise<void>;
}

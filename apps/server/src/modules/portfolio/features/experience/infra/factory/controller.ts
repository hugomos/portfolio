import { HttpController } from "@/infra/http/controller";
import type { ExperienceUseCaseFactory } from "./use-case";

export class ExperienceControllerFactory {
	constructor(private readonly useCaseFactory: ExperienceUseCaseFactory) {}

	get listExperiences() {
		return new HttpController(this.useCaseFactory.listExperiences);
	}

	get createExperience() {
		return new HttpController(this.useCaseFactory.createExperience);
	}

	get updateExperience() {
		return new HttpController(this.useCaseFactory.updateExperience);
	}

	get toggleActive() {
		return new HttpController(this.useCaseFactory.toggleActive);
	}

	get replaceHighlights() {
		return new HttpController(this.useCaseFactory.replaceHighlights);
	}

	get deleteExperience() {
		return new HttpController(this.useCaseFactory.deleteExperience);
	}

	get listCompanies() {
		return new HttpController(this.useCaseFactory.listCompanies);
	}

	get createCompany() {
		return new HttpController(this.useCaseFactory.createCompany);
	}

	get updateCompany() {
		return new HttpController(this.useCaseFactory.updateCompany);
	}
}

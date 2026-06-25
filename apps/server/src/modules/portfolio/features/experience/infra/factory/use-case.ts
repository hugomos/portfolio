import { CreateExperienceUseCase } from "../../application/use-case/create";
import { CreateCompanyUseCase } from "../../application/use-case/create-company";
import { DeleteExperienceUseCase } from "../../application/use-case/delete";
import { ListExperiencesUseCase } from "../../application/use-case/list";
import { ListCompaniesUseCase } from "../../application/use-case/list-companies";
import { ReplaceExperienceHighlightsUseCase } from "../../application/use-case/replace-highlights";
import { ToggleExperienceActiveUseCase } from "../../application/use-case/toggle-active";
import { UpdateExperienceUseCase } from "../../application/use-case/update";
import { UpdateCompanyUseCase } from "../../application/use-case/update-company";
import type { CompanyRepoDB } from "../db/company-repository";
import type { ExperienceRepoDB } from "../db/experience-repository";
import type { ExperienceDBFactory } from "./db";

export class ExperienceUseCaseFactory {
	private readonly experienceRepo: ExperienceRepoDB;
	private readonly companyRepo: CompanyRepoDB;

	constructor(db: ExperienceDBFactory) {
		this.experienceRepo = db.experienceRepo;
		this.companyRepo = db.companyRepo;
	}

	get listExperiences() {
		return new ListExperiencesUseCase(this.experienceRepo);
	}

	get createExperience() {
		return new CreateExperienceUseCase(this.experienceRepo, this.companyRepo);
	}

	get updateExperience() {
		return new UpdateExperienceUseCase(this.experienceRepo, this.companyRepo);
	}

	get toggleActive() {
		return new ToggleExperienceActiveUseCase(this.experienceRepo);
	}

	get replaceHighlights() {
		return new ReplaceExperienceHighlightsUseCase(this.experienceRepo);
	}

	get deleteExperience() {
		return new DeleteExperienceUseCase(this.experienceRepo);
	}

	get listCompanies() {
		return new ListCompaniesUseCase(this.companyRepo);
	}

	get createCompany() {
		return new CreateCompanyUseCase(this.companyRepo);
	}

	get updateCompany() {
		return new UpdateCompanyUseCase(this.companyRepo);
	}
}

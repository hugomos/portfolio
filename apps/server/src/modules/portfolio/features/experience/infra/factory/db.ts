import type { Db } from "@portfolio/db";
import { CompanyRepoDB } from "../db/company-repository";
import { ExperienceRepoDB } from "../db/experience-repository";

export class ExperienceDBFactory {
	constructor(private readonly connection: Db) {}

	get experienceRepo() {
		return new ExperienceRepoDB(this.connection);
	}

	get companyRepo() {
		return new CompanyRepoDB(this.connection);
	}
}

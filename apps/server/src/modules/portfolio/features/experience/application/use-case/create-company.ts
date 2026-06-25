import { UseCase } from "@/domain/use-case";
import { Company } from "@/modules/portfolio/domain/entity/company";
import type { CompanyRepo } from "../db/repository";

type Input = {
	name: string;
	website?: string | null;
};

type Output = {
	id: string;
};

export class CreateCompanyUseCase extends UseCase<Input, Output> {
	constructor(private readonly repo: CompanyRepo) {
		super();
	}

	async execute({ name, website }: Input): Promise<Output> {
		const company = Company.create({ name, website });
		await this.repo.create(company);
		return { id: company.id };
	}
}

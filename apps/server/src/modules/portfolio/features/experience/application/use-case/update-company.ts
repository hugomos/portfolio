import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import { Company } from "@/modules/portfolio/domain/entity/company";
import type { CompanyRepo } from "../db/repository";

type Input = {
	id: string;
	name: string;
	website?: string | null;
};

export class UpdateCompanyUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: CompanyRepo) {
		super();
	}

	async execute({ id, name, website }: Input): Promise<void> {
		const existing = await this.repo.findById(id);
		if (!existing) throw new DomainError("Company not found");

		const updated = Company.restore({ id, name, website: website ?? null });
		await this.repo.update(updated);
	}
}

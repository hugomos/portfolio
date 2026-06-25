import { UseCase } from "@/domain/use-case";
import type { CompanyRepo } from "../db/repository";

type CompanyItem = {
	id: string;
	name: string;
	website: string | null;
};

type Output = CompanyItem[];

export class ListCompaniesUseCase extends UseCase<void, Output> {
	constructor(private readonly repo: CompanyRepo) {
		super();
	}

	async execute(): Promise<Output> {
		const companies = await this.repo.list();
		return companies.map((c) => ({
			id: c.id,
			name: c.name,
			website: c.website,
		}));
	}
}

import type { Db } from "@portfolio/db";
import { eq } from "@portfolio/db/orm/drizzle-orm";
import { company as companyTable } from "@portfolio/db/schema";
import { Company } from "@/modules/portfolio/domain/entity/company";
import type { CompanyRepo } from "../../application/db/repository";

export class CompanyRepoDB implements CompanyRepo {
	constructor(private readonly connection: Db) {}

	async findById(id: string): Promise<Company | null> {
		const record = await this.connection.query.company.findFirst({
			where: eq(companyTable.id, id),
		});

		if (!record) return null;

		return Company.restore(record);
	}

	async list(): Promise<Company[]> {
		const records = await this.connection.query.company.findMany();
		return records.map((r) => Company.restore(r));
	}

	async create(company: Company): Promise<void> {
		await this.connection.insert(companyTable).values({
			id: company.id,
			name: company.name,
			website: company.website,
		});
	}

	async update(company: Company): Promise<void> {
		await this.connection
			.update(companyTable)
			.set({ name: company.name, website: company.website })
			.where(eq(companyTable.id, company.id));
	}
}

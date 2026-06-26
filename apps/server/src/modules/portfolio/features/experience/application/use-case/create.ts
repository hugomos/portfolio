import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import type { WorkMode } from "@/modules/portfolio/domain/entity/experience";
import { Experience } from "@/modules/portfolio/domain/entity/experience";
import type { CompanyRepo, ExperienceRepo } from "../db/repository";

type Input = {
	companyId: string;
	role: string;
	workMode: WorkMode;
	startDate: string;
	endDate?: string | null;
	visible?: boolean;
};

export class CreateExperienceUseCase extends UseCase<Input, { id: string }> {
	constructor(
		private readonly repo: ExperienceRepo,
		private readonly companyRepo: CompanyRepo,
	) {
		super();
	}

	async execute({
		companyId,
		role,
		workMode,
		startDate,
		endDate,
		visible,
	}: Input): Promise<{ id: string }> {
		const company = await this.companyRepo.findById(companyId);
		if (!company) throw new DomainError("Company not found");

		const experience = Experience.create({
			companyId,
			role,
			workMode,
			startDate,
			endDate,
			visible,
		});

		await this.repo.create(experience);

		return { id: experience.id };
	}
}

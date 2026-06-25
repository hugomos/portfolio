import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import type { WorkMode } from "@/modules/portfolio/domain/entity/experience";
import { Experience } from "@/modules/portfolio/domain/entity/experience";
import type { CompanyRepo, ExperienceRepo } from "../db/repository";

type Input = {
	id: string;
	companyId: string;
	role: string;
	workMode: WorkMode;
	startDate: string;
	endDate?: string | null;
};

export class UpdateExperienceUseCase extends UseCase<Input, void> {
	constructor(
		private readonly repo: ExperienceRepo,
		private readonly companyRepo: CompanyRepo,
	) {
		super();
	}

	async execute({
		id,
		companyId,
		role,
		workMode,
		startDate,
		endDate,
	}: Input): Promise<void> {
		const experience = await this.repo.findById(id);
		if (!experience) throw new DomainError("Experience not found");

		const company = await this.companyRepo.findById(companyId);
		if (!company) throw new DomainError("Company not found");

		const updated = Experience.restore({
			id: experience.id,
			companyId,
			role,
			workMode,
			startDate,
			endDate: endDate ?? null,
			visible: experience.visible,
			createdAt: experience.createdAt,
			updatedAt: new Date(),
			highlights: experience.highlights,
			company,
		});

		await this.repo.update(updated);
	}
}

import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import { Experience } from "@/modules/portfolio/domain/entity/experience";
import type { ExperienceRepo } from "../db/repository";

type Input = {
	id: string;
};

export class ToggleExperienceActiveUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: ExperienceRepo) {
		super();
	}

	async execute({ id }: Input): Promise<void> {
		const experience = await this.repo.findById(id);
		if (!experience) throw new DomainError("Experience not found");

		const updated = Experience.restore({
			id: experience.id,
			companyId: experience.companyId,
			role: experience.role,
			workMode: experience.workMode,
			startDate: experience.startDate,
			endDate: experience.endDate,
			visible: !experience.visible,
			createdAt: experience.createdAt,
			updatedAt: new Date(),
			highlights: experience.highlights,
			// biome-ignore lint/style/noNonNullAssertion: it's on purpose
			company: experience.company!,
		});

		await this.repo.update(updated);
	}
}

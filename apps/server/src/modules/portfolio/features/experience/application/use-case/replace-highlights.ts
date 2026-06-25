import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import { ExperienceHighlight } from "@/modules/portfolio/domain/entity/experience-highlight";
import type { ExperienceRepo } from "../db/repository";

type Input = {
	experienceId: string;
	highlights: Array<{ content: string; sortOrder: number }>;
};

export class ReplaceExperienceHighlightsUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: ExperienceRepo) {
		super();
	}

	async execute({ experienceId, highlights }: Input): Promise<void> {
		const experience = await this.repo.findById(experienceId);
		if (!experience) throw new DomainError("Experience not found");

		const newHighlights = highlights.map(({ content, sortOrder }) =>
			ExperienceHighlight.create({ experienceId, content, sortOrder }),
		);

		await this.repo.replaceHighlights(experienceId, newHighlights);
	}
}

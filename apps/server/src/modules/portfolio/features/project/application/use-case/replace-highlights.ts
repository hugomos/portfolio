import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import { ProjectHighlight } from "@/modules/portfolio/domain/entity/project-highlight";
import type { ProjectRepo } from "../db/repository";

type Input = {
	projectId: string;
	highlights: Array<{ content: string; sortOrder: number }>;
};

export class ReplaceProjectHighlightsUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: ProjectRepo) {
		super();
	}

	async execute({ projectId, highlights }: Input): Promise<void> {
		const project = await this.repo.findById(projectId);
		if (!project) throw new DomainError("Project not found");

		const newHighlights = highlights.map(({ content, sortOrder }) =>
			ProjectHighlight.create({ projectId, content, sortOrder }),
		);

		await this.repo.replaceHighlights(projectId, newHighlights);
	}
}

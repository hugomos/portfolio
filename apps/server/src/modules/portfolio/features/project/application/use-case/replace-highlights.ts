import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import { ProjectHighlight } from "@/modules/portfolio/domain/entity/project-highlight";
import type { ProjectRepo } from "../db/repository";

type Input = {
	id: string;
	highlights: Array<{ content: string; sortOrder: number }>;
};

export class ReplaceProjectHighlightsUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: ProjectRepo) {
		super();
	}

	async execute({ id, highlights }: Input): Promise<void> {
		const project = await this.repo.findById(id);
		if (!project) throw new DomainError("Project not found");

		const newHighlights = highlights.map(({ content, sortOrder }) =>
			ProjectHighlight.create({ projectId: id, content, sortOrder }),
		);

		await this.repo.replaceHighlights(id, newHighlights);
	}
}

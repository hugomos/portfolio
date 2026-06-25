import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import { Project } from "@/modules/portfolio/domain/entity/project";
import type { ProjectRepo } from "../db/repository";

type Input = {
	id: string;
};

export class ToggleProjectActiveUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: ProjectRepo) {
		super();
	}

	async execute({ id }: Input): Promise<void> {
		const project = await this.repo.findById(id);
		if (!project) throw new DomainError("Project not found");

		const updated = Project.restore({
			id: project.id,
			title: project.title,
			slug: project.slug,
			summary: project.summary,
			impact: project.impact,
			content: project.content,
			category: project.category,
			status: project.status,
			repositoryUrl: project.repositoryUrl,
			liveUrl: project.liveUrl,
			visible: !project.visible,
			createdAt: project.createdAt,
			updatedAt: new Date(),
			highlights: project.highlights,
			techs: project.techs,
		});

		await this.repo.update(updated);
	}
}

import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import type {
	ProjectCategory,
	ProjectStatus,
} from "@/modules/portfolio/domain/entity/project";
import { Project } from "@/modules/portfolio/domain/entity/project";
import type { ProjectRepo } from "../db/repository";

type Input = {
	id: string;
	title: string;
	summary: string;
	impact?: string | null;
	content?: string | null;
	category: ProjectCategory;
	status: ProjectStatus;
	repositoryUrl?: string | null;
	liveUrl?: string | null;
};

export class UpdateProjectUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: ProjectRepo) {
		super();
	}

	async execute({
		id,
		title,
		summary,
		impact,
		content,
		category,
		status,
		repositoryUrl,
		liveUrl,
	}: Input): Promise<void> {
		const project = await this.repo.findById(id);
		if (!project) throw new DomainError("Project not found");

		const updated = Project.restore({
			id: project.id,
			title,
			slug: project.slug,
			summary,
			impact: impact ?? null,
			content: content ?? null,
			category,
			status,
			repositoryUrl: repositoryUrl ?? null,
			liveUrl: liveUrl ?? null,
			visible: project.visible,
			createdAt: project.createdAt,
			updatedAt: new Date(),
			highlights: project.highlights,
			techs: project.techs,
		});

		await this.repo.update(updated);
	}
}

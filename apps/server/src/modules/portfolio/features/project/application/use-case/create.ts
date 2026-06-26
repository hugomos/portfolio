import { UseCase } from "@/domain/use-case";
import type {
	ProjectCategory,
	ProjectStatus,
} from "@/modules/portfolio/domain/entity/project";
import { Project } from "@/modules/portfolio/domain/entity/project";
import type { ProjectRepo } from "../db/repository";

type Input = {
	title: string;
	summary: string;
	impact?: string | null;
	content?: string | null;
	category: ProjectCategory;
	status: ProjectStatus;
	repositoryUrl?: string | null;
	liveUrl?: string | null;
	visible?: boolean;
};

export class CreateProjectUseCase extends UseCase<Input, { id: string }> {
	constructor(private readonly repo: ProjectRepo) {
		super();
	}

	async execute({
		title,
		summary,
		impact,
		content,
		category,
		status,
		repositoryUrl,
		liveUrl,
		visible,
	}: Input): Promise<{ id: string }> {
		const project = Project.create({
			title,
			summary,
			impact,
			content,
			category,
			status,
			repositoryUrl,
			liveUrl,
			visible,
		});

		await this.repo.create(project);

		return { id: project.id };
	}
}

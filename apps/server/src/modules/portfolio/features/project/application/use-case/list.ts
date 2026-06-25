/** biome-ignore-all lint/style/noNonNullAssertion: it's on purpose */
import { UseCase } from "@/domain/use-case";
import type {
	ProjectCategory,
	ProjectStatus,
} from "@/modules/portfolio/domain/entity/project";
import type { ProjectRepo } from "../db/repository";

type ProjectItem = {
	id: string;
	title: string;
	slug: string;
	summary: string;
	impact: string | null;
	content: string | null;
	category: ProjectCategory;
	status: ProjectStatus;
	repositoryUrl: string | null;
	liveUrl: string | null;
	visible: boolean;
	highlights: Array<{ content: string; sortOrder: number }>;
	techs: Array<{ name: string; sortOrder: number }>;
};

type Output = ProjectItem[];

export class ListProjectsUseCase extends UseCase<void, Output> {
	constructor(private readonly repo: ProjectRepo) {
		super();
	}

	async execute(): Promise<Output> {
		const projects = await this.repo.list();

		return projects.map((project) => ({
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
			visible: project.visible,
			highlights: project.highlights.map(({ content, sortOrder }) => ({
				content,
				sortOrder,
			})),
			techs: project.techs.map(({ name, sortOrder }) => ({ name, sortOrder })),
		}));
	}
}

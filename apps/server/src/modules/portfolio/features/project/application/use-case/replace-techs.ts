import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import { ProjectTech } from "@/modules/portfolio/domain/entity/project-tech";
import type { ProjectRepo } from "../db/repository";

type Input = {
	projectId: string;
	techs: Array<{ name: string; sortOrder: number }>;
};

export class ReplaceProjectTechsUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: ProjectRepo) {
		super();
	}

	async execute({ projectId, techs }: Input): Promise<void> {
		const project = await this.repo.findById(projectId);
		if (!project) throw new DomainError("Project not found");

		const newTechs = techs.map(({ name, sortOrder }) =>
			ProjectTech.create({ projectId, name, sortOrder }),
		);

		await this.repo.replaceTechs(projectId, newTechs);
	}
}

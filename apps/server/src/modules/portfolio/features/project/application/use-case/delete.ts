import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import type { ProjectRepo } from "../db/repository";

type Input = {
	id: string;
};

export class DeleteProjectUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: ProjectRepo) {
		super();
	}

	async execute({ id }: Input): Promise<void> {
		const project = await this.repo.findById(id);
		if (!project) throw new DomainError("Project not found");

		await this.repo.delete(id);
	}
}

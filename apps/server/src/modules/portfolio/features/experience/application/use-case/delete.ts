import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import type { ExperienceRepo } from "../db/repository";

type Input = {
	id: string;
};

export class DeleteExperienceUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: ExperienceRepo) {
		super();
	}

	async execute({ id }: Input): Promise<void> {
		const experience = await this.repo.findById(id);
		if (!experience) throw new DomainError("Experience not found");

		await this.repo.delete(id);
	}
}

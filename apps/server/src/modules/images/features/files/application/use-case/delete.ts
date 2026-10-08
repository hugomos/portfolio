import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import type { Upload } from "@/infra/upload/upload";
import type { FileRepo } from "../db/repository";

type Input = { id: string };

export class DeleteFileUseCase extends UseCase<Input, void> {
	constructor(
		private readonly repo: FileRepo,
		private readonly storage: Upload,
	) {
		super();
	}

	async execute({ id }: Input): Promise<void> {
		const image = await this.repo.findById(id);
		if (!image) throw new DomainError("File not found");

		await this.storage.deleteObject(image.keyname);
		await this.repo.delete(id);
	}
}

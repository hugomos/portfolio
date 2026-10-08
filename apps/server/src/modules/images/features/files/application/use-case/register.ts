import { UseCase } from "@/domain/use-case";
import { Image } from "@/modules/images/domain/entity/image";
import type { FileRepo } from "../db/repository";

type Input = {
	name: string;
	keyname: string;
	contentType: string;
	publicUrl: string;
};

export class RegisterFileUseCase extends UseCase<Input, { id: string }> {
	constructor(private readonly repo: FileRepo) {
		super();
	}

	async execute({ name, keyname, contentType, publicUrl }: Input): Promise<{ id: string }> {
		const image = Image.create({ name, keyname, contentType, publicUrl });
		await this.repo.create(image);
		return { id: image.id };
	}
}

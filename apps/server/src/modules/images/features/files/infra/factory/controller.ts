import { HttpController } from "@/infra/http/controller";
import type { FilesUseCaseFactory } from "./use-case";

export class FilesControllerFactory {
	constructor(private readonly useCaseFactory: FilesUseCaseFactory) {}

	get registerFile() {
		return new HttpController(this.useCaseFactory.registerFile);
	}

	get deleteFile() {
		return new HttpController(this.useCaseFactory.deleteFile);
	}
}

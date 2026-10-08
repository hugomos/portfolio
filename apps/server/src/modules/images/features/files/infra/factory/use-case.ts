import type { Upload } from "@/infra/upload/upload";
import { DeleteFileUseCase } from "../../application/use-case/delete";
import { RegisterFileUseCase } from "../../application/use-case/register";
import type { FileRepoDB } from "../db/repository";
import type { FilesDBFactory } from "./db";

export class FilesUseCaseFactory {
	private readonly repo: FileRepoDB;

	constructor(
		db: FilesDBFactory,
		private readonly storage: Upload,
	) {
		this.repo = db.fileRepo;
	}

	get registerFile() {
		return new RegisterFileUseCase(this.repo);
	}

	get deleteFile() {
		return new DeleteFileUseCase(this.repo, this.storage);
	}
}

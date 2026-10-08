import type { Db } from "@portfolio/db";
import { FileRepoDB } from "../db/repository";

export class FilesDBFactory {
	constructor(private readonly connection: Db) {}

	get fileRepo() {
		return new FileRepoDB(this.connection);
	}
}

import type { Db } from "@portfolio/db";
import { ProjectRepoDB } from "../db/repository";

export class ProjectDBFactory {
	constructor(private readonly connection: Db) {}

	get projectRepo() {
		return new ProjectRepoDB(this.connection);
	}
}

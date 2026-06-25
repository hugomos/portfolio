import type { Db } from "@portfolio/db";
import { HeroRepoDB } from "../db/repository";

export class HeroDBFactory {
	constructor(private readonly connection: Db) {}

	get heroRepo() {
		return new HeroRepoDB(this.connection);
	}
}

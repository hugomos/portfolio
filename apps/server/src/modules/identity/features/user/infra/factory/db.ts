import type { Db } from "@portfolio/db";
import { UserDAODB } from "../db/dao";

export class UserDBFactory {
	constructor(private readonly connection: Db) {}

	get userDAO() {
		return new UserDAODB(this.connection);
	}
}

import type { Db } from "@portfolio/db";
import { AuthenticationDAODB } from "../db/dao";
import { AuthenticationRepoDB } from "../db/repository";

export class AuthenticationDBFactory {
	constructor(private readonly connection: Db) {}

	get authenticationRepo() {
		return new AuthenticationRepoDB(this.connection);
	}

	get authenticationDAO() {
		return new AuthenticationDAODB(this.connection);
	}
}

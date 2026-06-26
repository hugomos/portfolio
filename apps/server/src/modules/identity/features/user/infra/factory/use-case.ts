import { MeUseCase } from "../../application/use-case/me";
import type { UserDAODB } from "../db/dao";
import type { UserDBFactory } from "./db";

export class UserUseCaseFactory {
	private readonly dao: UserDAODB;

	constructor(db: UserDBFactory) {
		this.dao = db.userDAO;
	}

	get me() {
		return new MeUseCase(this.dao);
	}
}

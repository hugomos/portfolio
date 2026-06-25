import { IssueRefreshTokenUseCase } from "../../application/use-case/issue-refresh-token";
import { RefreshTokenUseCase } from "../../application/use-case/refresh-token";
import { SignInUseCase } from "../../application/use-case/sign-in";
import { SignOutUseCase } from "../../application/use-case/sign-out";
import type { AuthenticationDAODB } from "../db/dao";
import type { AuthenticationRepoDB } from "../db/repository";
import type { AuthenticationDBFactory } from "./db";

export class AuthenticationUseCaseFactory {
	private readonly repo: AuthenticationRepoDB;
	private readonly dao: AuthenticationDAODB;

	constructor(db: AuthenticationDBFactory) {
		this.repo = db.authenticationRepo;
		this.dao = db.authenticationDAO;
	}

	get signIn() {
		return new SignInUseCase(this.dao);
	}

	get issueRefreshToken() {
		return new IssueRefreshTokenUseCase(this.repo);
	}

	get refreshToken() {
		return new RefreshTokenUseCase(this.repo, this.dao);
	}

	get signOut() {
		return new SignOutUseCase(this.repo);
	}
}

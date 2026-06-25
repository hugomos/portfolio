import { Token } from "@/domain/entity/token";
import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import { AuthToken } from "@/modules/identity/domain/entity/auth-token";
import { TokenExpiry } from "@/modules/identity/domain/vo/token-expiry";
import type { AuthenticationDAO } from "../db/dao";
import type { AuthenticationRepo } from "../db/repository";

type Input = {
	token: string;
};

type Output = {
	userId: string;
	token: string;
};

export class RefreshTokenUseCase extends UseCase<Input, Output> {
	constructor(
		private readonly repo: AuthenticationRepo,
		private readonly dao: AuthenticationDAO,
	) {
		super();
	}

	async execute({ token }: Input): Promise<Output> {
		const tokenHash = Token.restore(token).hash();
		const authToken = await this.repo.findAndMarkAsUsed(tokenHash);

		if (!authToken) throw new DomainError("Invalid token");
		if (authToken.isExpired()) throw new DomainError("Token expired");

		const user = await this.dao.findUserById(authToken.userId);
		if (!user) throw new DomainError("User not found");

		const newToken = Token.create();
		const newAuthToken = AuthToken.create({
			userId: authToken.userId,
			tokenHash: newToken.hash(),
			expiresAt: TokenExpiry.forRefreshToken(),
		});

		await this.repo.create(newAuthToken);
		return { userId: authToken.userId, token: newToken.value };
	}
}

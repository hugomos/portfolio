import { Token } from "@/domain/entity/token";
import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import type { AuthenticationRepo } from "../db/repository";

type Input = {
	token: string;
};

export class SignOutUseCase extends UseCase<Input, void> {
	constructor(private readonly refreshTokenRepo: AuthenticationRepo) {
		super();
	}

	async execute({ token }: Input): Promise<void> {
		const tokenHash = Token.restore(token).hash();
		const authToken = await this.refreshTokenRepo.findByTokenHash(tokenHash);

		if (!authToken) throw new DomainError("Invalid token");
		if (authToken.isExpired()) throw new DomainError("Token expired");
		if (authToken.isUsed()) throw new DomainError("Invalid token");

		await this.refreshTokenRepo.delete(tokenHash);
	}
}

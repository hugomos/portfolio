import { Token } from "@/domain/entity/token"
import { UseCase } from "@/domain/use-case"
import { AuthToken } from "@/modules/identity/domain/entity/auth-token"
import { TokenExpiry } from "@/modules/identity/domain/vo/token-expiry"
import type { AuthenticationRepo } from "../db/repository"

type Input = {
	userId: string
}

type Output = {
	token: string
}

export class IssueRefreshTokenUseCase extends UseCase<Input, Output> {
	constructor(private readonly refreshTokenRepo: AuthenticationRepo) {
		super()
	}

	async execute({ userId }: Input): Promise<Output> {
		const token = Token.create()
		const authToken = AuthToken.create({
			userId,
			tokenHash: token.hash(),
			expiresAt: TokenExpiry.forRefreshToken(),
		})

		await this.refreshTokenRepo.create(authToken)

		return { token: token.value }
	}
}

import { verify } from "argon2";
import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import type { AuthenticationDAO } from "../db/dao";

type Input = {
	email: string;
	password: string;
};

type Output = {
	userId: string;
};

export class SignInUseCase extends UseCase<Input, Output> {
	constructor(private readonly authenticationDAO: AuthenticationDAO) {
		super();
	}

	async execute({ email, password }: Input): Promise<Output> {
		const user = await this.authenticationDAO.findUserByEmailForAuth(email);

		if (!user) throw new DomainError("Invalid credentials");

		const passwordMatch = await verify(user.passwordHash, password);
		if (!passwordMatch) throw new DomainError("Invalid credentials");

		return { userId: user.id };
	}
}

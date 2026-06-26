import { NotFoundError } from "@/domain/error/not-found-error";
import { UseCase } from "@/domain/use-case";
import type { UserDAO } from "../db/dao";

type Input = {
	userId: string;
};

type Output = {
	id: string;
	email: string;
};

export class MeUseCase extends UseCase<Input, Output> {
	constructor(private readonly dao: UserDAO) {
		super();
	}

	async execute({ userId }: Input): Promise<Output> {
		const user = await this.dao.findById(userId);
		if (!user) throw new NotFoundError("User");

		return { id: user.id, email: user.email };
	}
}

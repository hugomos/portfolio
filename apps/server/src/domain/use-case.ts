import { type Either, left, right } from "@portfolio/either";
import { logger } from "@/infra/logger";
import { DomainError } from "./error/domain-error";

export abstract class UseCase<Input = any, Output = any> {
	abstract execute(input?: Input): Promise<Output>;

	async perform(input?: Input): Promise<Either<Error, Output>> {
		try {
			const output = await this.execute(input);
			return right(output);
		} catch (error: any) {
			if (error instanceof DomainError) return left(error);
			logger.error(
				{ err: error, useCase: this.constructor.name },
				"Unhandled error in use case",
			);
			throw error;
		}
	}
}

import { HttpController } from "@/infra/http/controller";
import type { UserUseCaseFactory } from "./use-case";

export class UserControllerFactory {
	constructor(private readonly useCaseFactory: UserUseCaseFactory) {}

	get me() {
		return new HttpController(this.useCaseFactory.me);
	}
}

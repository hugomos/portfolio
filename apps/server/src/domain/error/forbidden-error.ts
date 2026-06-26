import { DomainError } from "./domain-error";

export class ForbiddenError extends DomainError {
	constructor() {
		super("Access forbidden");
		this.name = "ForbiddenError";
	}
}

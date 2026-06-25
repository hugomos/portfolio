import { DomainError } from "./domain-error"

export class NotFoundError extends DomainError {
	constructor(resource: string) {
		super(`${resource} not found`)
		this.name = "NotFoundError"
	}
}

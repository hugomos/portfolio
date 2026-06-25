import type { FastifyReply } from "fastify"
import { ForbiddenError } from "@/domain/error/forbidden-error"
import { NotFoundError } from "@/domain/error/not-found-error"
import type { UseCase } from "@/domain/use-case"
import { HttpStatusCode } from "./ports/response"

function errorStatusCode(error: Error): HttpStatusCode {
	if (error instanceof NotFoundError) return HttpStatusCode.NOT_FOUND
	if (error instanceof ForbiddenError) return HttpStatusCode.FORBIDDEN
	return HttpStatusCode.BAD_REQUEST
}

export class HttpController {
	constructor(protected readonly useCase: UseCase) {}

	async handle(reply: FastifyReply, input?: any): Promise<void> {
		const output = await this.useCase.perform(input)

		if (output.isLeft()) {
			reply
				.status(errorStatusCode(output.value))
				.send({ message: output.value.message })
			return
		}

		if (!output.value) {
			reply.status(HttpStatusCode.NO_CONTENT).send()
			return
		}

		reply.status(HttpStatusCode.OK).send(output.value)
	}
}

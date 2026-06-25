import type { FastifyInstance } from "fastify"
import fp from "fastify-plugin"

export const requestInputMiddleware = fp(async (app: FastifyInstance) => {
	app.addHook("preHandler", async (request) => {
		const token = request.headers.token as string | undefined

		request.input = {
			...(token ? { token } : {}),
			...(request.query as object),
			...(request.body as object),
			...(request.params as object),
		}
	})
})

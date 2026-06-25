export {} // module augmentation - dont remove

declare module "fastify" {
	interface FastifyRequest {
		input: any
		getCurrentUser(): { id: string; role: string }
	}

	interface FastifyContextConfig {
		public?: boolean
	}
}

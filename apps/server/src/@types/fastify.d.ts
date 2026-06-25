export {}; // module augmentation - dont remove

declare module "fastify" {
	interface FastifyRequest {
		input: any;
		getCurrentUser(): { id: string };
	}

	interface FastifyContextConfig {
		public?: boolean;
	}
}

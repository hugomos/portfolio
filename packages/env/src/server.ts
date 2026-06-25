import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		CORS_ORIGIN: z.url(),
		SERVER_URL: z.url(),
		PORT: z.coerce.number().default(3000),
		JWT_SECRET: z.string().min(32),
		REFRESH_TOKEN_EXPIRY_IN_DAYS: z.coerce.number().default(30),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	},
	runtimeEnv: process.env,
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});

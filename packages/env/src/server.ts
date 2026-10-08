import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		CORS_ORIGIN: z.string().url(),
		SERVER_URL: z.string().url(),
		REVALIDATION_SECRET: z.string().min(1),
		PORT: z.coerce.number().default(3000),
		JWT_SECRET: z.string().min(32),
		REFRESH_TOKEN_EXPIRY_IN_DAYS: z.coerce.number().default(30),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
		CLOUDFLARE_R2_ENDPOINT: z.url(),
		CLOUDFLARE_R2_PUBLIC_URL: z.url(),
		CLOUDFLARE_R2_ACCESS_KEY_ID: z.string(),
		CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string(),
		CLOUDFLARE_R2_BUCKET: z.string(),
	},
	runtimeEnv: process.env,
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});

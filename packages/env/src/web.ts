import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	clientPrefix: "NEXT_PUBLIC_",
	client: {
		NEXT_PUBLIC_SERVER_URL: z.string().url(),
	},
	server: {
		REVALIDATION_SECRET: z.string().min(1),
	},
	runtimeEnv: {
		NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
		REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
	},
	emptyStringAsUndefined: true,
});

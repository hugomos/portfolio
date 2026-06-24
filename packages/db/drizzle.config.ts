import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

const envFile =
	process.env.NODE_ENV === "production"
		? ".env.production"
		: ".env.development";
dotenv.config({ path: envFile });

export default defineConfig({
	schema: "./src/schema.ts",
	out: "./src/migrations",
	dialect: "turso",
	dbCredentials: {
		url: process.env.DATABASE_URL || "file:./portfolio.db",
	},
});

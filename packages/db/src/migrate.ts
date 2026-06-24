import * as path from "node:path";
import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

const envFile =
	process.env.NODE_ENV === "production"
		? ".env.production"
		: ".env.development";
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL)
	throw new Error(`DATABASE_URL is not set (loaded from ${envFile})`);

const client = createClient({ url: DATABASE_URL });
const instance = drizzle(client);

const migrationsFolder = path.resolve(path.dirname("."), "src", "migrations");
console.log("[drizzle] running schema migrations...");
await migrate(instance, { migrationsFolder });
console.log("[drizzle] schema migrations completed");
await client.close();

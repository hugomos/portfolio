import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "@portfolio/env/db";

import * as schema from "./schema";

export function createDb() {
	const client = createClient({ url: env.DATABASE_URL });
	return drizzle(client, { schema });
}

export const db = createDb();
export type Db = ReturnType<typeof createDb>;

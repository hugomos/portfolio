// biome-ignore-all lint: seed file
import { randomUUID } from "node:crypto";
import { createClient } from "@libsql/client";
import { hash } from "argon2";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { hero } from "./schemas/hero";
import { user } from "./schemas/user";

const envFile =
	process.env.NODE_ENV === "production"
		? ".env.production"
		: ".env.development";
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

if (!DATABASE_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
	console.error(
		"Required: DATABASE_URL, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD",
	);
	process.exit(1);
}

const db = drizzle(createClient({ url: DATABASE_URL }));

async function seed(email: string, password: string) {
	const now = new Date().toISOString();
	const passwordHash = await hash(password);

	await db.transaction(async (tx) => {
		await tx.insert(user).values({
			id: randomUUID(),
			email,
			passwordHash,
			createdAt: now,
			updatedAt: now,
		});

		await tx.insert(hero).values({
			id: randomUUID(),
			name: "Vitor Hugo Oliveira",
			title: "Software Engineer",
			bio: "Full-stack developer focused on building software that solves real-world problems. Experienced in designing APIs, internal platforms, geospatial tools, and business applications that streamline workflows and improve operational efficiency.",
			resumeUrl: null,
			githubUrl: "https://github.com/hugomos",
			linkedinUrl: "https://linkedin.com/in/hugomos",
			updatedAt: now,
		});
	});
}

seed(ADMIN_EMAIL, ADMIN_PASSWORD)
	.then(() => process.exit(0))
	.catch((err) => {
		console.error("Error seeding database:", err);
		process.exit(1);
	});

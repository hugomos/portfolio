import { randomUUID } from "node:crypto";
import type { Db } from "@portfolio/db";
import { and, eq, isNull } from "@portfolio/db/orm/drizzle-orm";
import { refreshToken } from "@portfolio/db/schema";
import { AuthToken } from "@/modules/identity/domain/entity/auth-token";
import type { AuthenticationRepo } from "../../application/db/repository";

export class AuthenticationRepoDB implements AuthenticationRepo {
	constructor(private readonly connection: Db) {}

	async create(token: AuthToken): Promise<void> {
		await this.connection.insert(refreshToken).values({
			id: randomUUID(),
			userId: token.userId,
			tokenHash: token.tokenHash,
			expiresAt: token.expiresAt.value.toISOString(),
			usedAt: token.usedAt?.toISOString() ?? null,
			createdAt: new Date().toISOString(),
		});
	}

	async findByTokenHash(hash: string): Promise<AuthToken | null> {
		const record = await this.connection.query.refreshToken.findFirst({
			where: eq(refreshToken.tokenHash, hash),
		});

		if (!record) return null;
		return AuthToken.restore({
			userId: record.userId,
			tokenHash: record.tokenHash,
			expiresAt: new Date(record.expiresAt),
			usedAt: record.usedAt ? new Date(record.usedAt) : null,
		});
	}

	async delete(tokenHash: string): Promise<void> {
		await this.connection
			.delete(refreshToken)
			.where(eq(refreshToken.tokenHash, tokenHash));
	}

	async findAndMarkAsUsed(hash: string): Promise<AuthToken | null> {
		const [record] = await this.connection
			.update(refreshToken)
			.set({ usedAt: new Date().toISOString() })
			.where(and(eq(refreshToken.tokenHash, hash), isNull(refreshToken.usedAt)))
			.returning();

		if (!record) return null;
		return AuthToken.restore({
			userId: record.userId,
			tokenHash: record.tokenHash,
			expiresAt: new Date(record.expiresAt),
			usedAt: record.usedAt ? new Date(record.usedAt) : null,
		});
	}
}

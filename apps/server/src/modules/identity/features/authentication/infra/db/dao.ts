import type { Db } from "@portfolio/db";
import { eq } from "@portfolio/db/orm/drizzle-orm";
import { user } from "@portfolio/db/schema";
import type { AuthenticationDAO, UserRecord } from "../../application/db/dao";

export class AuthenticationDAODB implements AuthenticationDAO {
	constructor(private readonly connection: Db) {}

	async findUserByEmail(email: string): Promise<UserRecord | null> {
		const record = await this.connection.query.user.findFirst({
			where: eq(user.email, email),
		});

		if (!record) return null;
		return { id: record.id, email: record.email };
	}

	async findUserById(id: string): Promise<UserRecord | null> {
		const record = await this.connection.query.user.findFirst({
			where: eq(user.id, id),
		});

		if (!record) return null;
		return { id: record.id, email: record.email };
	}

	async findUserByEmailForAuth(
		email: string,
	): Promise<{ id: string; passwordHash: string } | null> {
		const record = await this.connection.query.user.findFirst({
			where: eq(user.email, email),
		});

		if (!record) return null;
		return { id: record.id, passwordHash: record.passwordHash };
	}
}

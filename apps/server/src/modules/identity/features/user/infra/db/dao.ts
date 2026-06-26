import type { Db } from "@portfolio/db";
import { eq } from "@portfolio/db/orm/drizzle-orm";
import { user } from "@portfolio/db/schema";
import type { UserDAO, UserRecord } from "../../application/db/dao";

export class UserDAODB implements UserDAO {
	constructor(private readonly connection: Db) {}

	async findById(id: string): Promise<UserRecord | null> {
		const record = await this.connection.query.user.findFirst({
			where: eq(user.id, id),
		});

		if (!record) return null;
		return { id: record.id, email: record.email };
	}
}

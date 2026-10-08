import type { Db } from "@portfolio/db";
import { eq } from "@portfolio/db/orm/drizzle-orm";
import { files as filesTable } from "@portfolio/db/schema";
import { Image } from "@/modules/images/domain/entity/image";
import type { FileRepo } from "../../application/db/repository";

export class FileRepoDB implements FileRepo {
	constructor(private readonly connection: Db) {}

	async findById(id: string): Promise<Image | null> {
		const record = await this.connection.query.files.findFirst({
			where: eq(filesTable.id, id),
		});

		if (!record) return null;

		return Image.restore({
			id: record.id,
			name: record.name,
			keyname: record.keyname,
			contentType: record.contentType,
			publicUrl: record.publicUrl,
			createdAt: new Date(record.createdAt),
		});
	}

	async create(image: Image): Promise<void> {
		await this.connection.insert(filesTable).values({
			id: image.id,
			name: image.name,
			keyname: image.keyname,
			contentType: image.contentType,
			publicUrl: image.publicUrl,
			createdAt: image.createdAt.toISOString(),
		});
	}

	async delete(id: string): Promise<void> {
		await this.connection.delete(filesTable).where(eq(filesTable.id, id));
	}
}

import { Id } from "@/domain/entity/id";

interface ConstructorProps {
	id: string;
	name: string;
	keyname: string;
	contentType: string;
	publicUrl: string;
	createdAt: Date;
}

interface CreateProps {
	name: string;
	keyname: string;
	contentType: string;
	publicUrl: string;
}

interface RestoreProps {
	id: string;
	name: string;
	keyname: string;
	contentType: string;
	publicUrl: string;
	createdAt: Date;
}

export class Image {
	readonly id: string;
	readonly name: string;
	readonly keyname: string;
	readonly contentType: string;
	readonly publicUrl: string;
	readonly createdAt: Date;

	private constructor({ id, name, keyname, contentType, publicUrl, createdAt }: ConstructorProps) {
		this.id = id;
		this.name = name;
		this.keyname = keyname;
		this.contentType = contentType;
		this.publicUrl = publicUrl;
		this.createdAt = createdAt;
	}

	static create({ name, keyname, contentType, publicUrl }: CreateProps): Image {
		return new Image({
			id: Id.create().value,
			name,
			keyname,
			contentType,
			publicUrl,
			createdAt: new Date(),
		});
	}

	static restore({ id, name, keyname, contentType, publicUrl, createdAt }: RestoreProps): Image {
		return new Image({ id, name, keyname, contentType, publicUrl, createdAt });
	}
}

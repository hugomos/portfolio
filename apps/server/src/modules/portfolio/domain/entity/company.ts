import { Id } from "@/domain/entity/id";

interface ConstructorProps {
	id: string;
	name: string;
	website: string | null;
}

interface CreateProps {
	name: string;
	website?: string | null;
}

interface RestoreProps {
	id: string;
	name: string;
	website: string | null;
}

export class Company {
	readonly id: string;
	readonly name: string;
	readonly website: string | null;

	private constructor({ id, name, website }: ConstructorProps) {
		this.id = id;
		this.name = name;
		this.website = website ?? null;
	}

	static create({ name, website }: CreateProps): Company {
		return new Company({
			id: Id.create().value,
			name,
			website: website ?? null,
		});
	}

	static restore({ id, name, website }: RestoreProps): Company {
		return new Company({ id, name, website });
	}
}

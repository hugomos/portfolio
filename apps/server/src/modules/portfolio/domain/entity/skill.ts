import { Id } from "@/domain/entity/id";

interface ConstructorProps {
	id: string;
	heroId: string;
	name: string;
	sortOrder: number;
}

interface CreateProps {
	heroId: string;
	name: string;
	sortOrder: number;
}

interface RestoreProps {
	id: string;
	heroId: string;
	name: string;
	sortOrder: number;
}

export class Skill {
	readonly id: string;
	readonly heroId: string;
	readonly name: string;
	readonly sortOrder: number;

	private constructor({ id, heroId, name, sortOrder }: ConstructorProps) {
		this.id = id;
		this.heroId = heroId;
		this.name = name;
		this.sortOrder = sortOrder;
	}

	static create({ heroId, name, sortOrder }: CreateProps): Skill {
		return new Skill({ id: Id.create().value, heroId, name, sortOrder });
	}

	static restore({ id, heroId, name, sortOrder }: RestoreProps): Skill {
		return new Skill({ id, heroId, name, sortOrder });
	}
}

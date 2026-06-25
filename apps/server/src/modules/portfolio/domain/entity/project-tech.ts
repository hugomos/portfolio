import { Id } from "@/domain/entity/id";

interface ConstructorProps {
	id: string;
	projectId: string;
	name: string;
	sortOrder: number;
}

interface CreateProps {
	projectId: string;
	name: string;
	sortOrder: number;
}

interface RestoreProps {
	id: string;
	projectId: string;
	name: string;
	sortOrder: number;
}

export class ProjectTech {
	readonly id: string;
	readonly projectId: string;
	readonly name: string;
	readonly sortOrder: number;

	private constructor({ id, projectId, name, sortOrder }: ConstructorProps) {
		this.id = id;
		this.projectId = projectId;
		this.name = name;
		this.sortOrder = sortOrder;
	}

	static create({ projectId, name, sortOrder }: CreateProps): ProjectTech {
		return new ProjectTech({ id: Id.create().value, projectId, name, sortOrder });
	}

	static restore({ id, projectId, name, sortOrder }: RestoreProps): ProjectTech {
		return new ProjectTech({ id, projectId, name, sortOrder });
	}
}

import { Id } from "@/domain/entity/id";

interface ConstructorProps {
	id: string;
	projectId: string;
	content: string;
	sortOrder: number;
}

interface CreateProps {
	projectId: string;
	content: string;
	sortOrder: number;
}

interface RestoreProps {
	id: string;
	projectId: string;
	content: string;
	sortOrder: number;
}

export class ProjectHighlight {
	readonly id: string;
	readonly projectId: string;
	readonly content: string;
	readonly sortOrder: number;

	private constructor({ id, projectId, content, sortOrder }: ConstructorProps) {
		this.id = id;
		this.projectId = projectId;
		this.content = content;
		this.sortOrder = sortOrder;
	}

	static create({ projectId, content, sortOrder }: CreateProps): ProjectHighlight {
		return new ProjectHighlight({ id: Id.create().value, projectId, content, sortOrder });
	}

	static restore({ id, projectId, content, sortOrder }: RestoreProps): ProjectHighlight {
		return new ProjectHighlight({ id, projectId, content, sortOrder });
	}
}

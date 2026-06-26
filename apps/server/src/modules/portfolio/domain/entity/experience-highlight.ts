import { Id } from "@/domain/entity/id";

interface ConstructorProps {
	id: string;
	experienceId: string;
	content: string;
	sortOrder: number;
}

interface CreateProps {
	experienceId: string;
	content: string;
	sortOrder: number;
}

interface RestoreProps {
	id: string;
	experienceId: string;
	content: string;
	sortOrder: number;
}

export class ExperienceHighlight {
	readonly id: string;
	readonly experienceId: string;
	readonly content: string;
	readonly sortOrder: number;

	private constructor({
		id,
		experienceId,
		content,
		sortOrder,
	}: ConstructorProps) {
		this.id = id;
		this.experienceId = experienceId;
		this.content = content;
		this.sortOrder = sortOrder;
	}

	static create({
		experienceId,
		content,
		sortOrder,
	}: CreateProps): ExperienceHighlight {
		return new ExperienceHighlight({
			id: Id.create().value,
			experienceId,
			content,
			sortOrder,
		});
	}

	static restore({
		id,
		experienceId,
		content,
		sortOrder,
	}: RestoreProps): ExperienceHighlight {
		return new ExperienceHighlight({ id, experienceId, content, sortOrder });
	}
}

import { Id } from "@/domain/entity/id";
import { Slug } from "@/domain/entity/slug";
import type { ProjectHighlight } from "./project-highlight";
import type { ProjectTech } from "./project-tech";

export type ProjectCategory = "fullstack" | "frontend" | "backend" | "cli" | "mobile";
export type ProjectStatus = "active" | "wip" | "archived";

interface ConstructorProps {
	id: string;
	title: string;
	slug: string;
	summary: string;
	impact: string | null;
	content: string | null;
	category: ProjectCategory;
	status: ProjectStatus;
	repositoryUrl: string | null;
	liveUrl: string | null;
	visible: boolean;
	createdAt: Date;
	updatedAt: Date;
	highlights: ProjectHighlight[];
	techs: ProjectTech[];
}

interface CreateProps {
	title: string;
	summary: string;
	impact?: string | null;
	content?: string | null;
	category: ProjectCategory;
	status: ProjectStatus;
	repositoryUrl?: string | null;
	liveUrl?: string | null;
	visible?: boolean;
}

interface RestoreProps {
	id: string;
	title: string;
	slug: string;
	summary: string;
	impact: string | null;
	content: string | null;
	category: ProjectCategory;
	status: ProjectStatus;
	repositoryUrl: string | null;
	liveUrl: string | null;
	visible: boolean;
	createdAt: Date;
	updatedAt: Date;
	highlights: ProjectHighlight[];
	techs: ProjectTech[];
}

export class Project {
	readonly id: string;
	readonly title: string;
	readonly slug: string;
	readonly summary: string;
	readonly impact: string | null;
	readonly content: string | null;
	readonly category: ProjectCategory;
	readonly status: ProjectStatus;
	readonly repositoryUrl: string | null;
	readonly liveUrl: string | null;
	readonly visible: boolean;
	readonly createdAt: Date;
	readonly updatedAt: Date;
	private readonly _highlights: ProjectHighlight[];
	private readonly _techs: ProjectTech[];

	private constructor({
		id,
		title,
		slug,
		summary,
		impact,
		content,
		category,
		status,
		repositoryUrl,
		liveUrl,
		visible,
		createdAt,
		updatedAt,
		highlights,
		techs,
	}: ConstructorProps) {
		this.id = id;
		this.title = title;
		this.slug = slug;
		this.summary = summary;
		this.impact = impact ?? null;
		this.content = content ?? null;
		this.category = category;
		this.status = status;
		this.repositoryUrl = repositoryUrl ?? null;
		this.liveUrl = liveUrl ?? null;
		this.visible = visible;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this._highlights = highlights;
		this._techs = techs;
	}

	static create({
		title,
		summary,
		impact,
		content,
		category,
		status,
		repositoryUrl,
		liveUrl,
		visible,
	}: CreateProps): Project {
		const now = new Date();
		return new Project({
			id: Id.create().value,
			title,
			slug: Slug.create(title).value,
			summary,
			impact: impact ?? null,
			content: content ?? null,
			category,
			status,
			repositoryUrl: repositoryUrl ?? null,
			liveUrl: liveUrl ?? null,
			visible: visible ?? false,
			createdAt: now,
			updatedAt: now,
			highlights: [],
			techs: [],
		});
	}

	static restore({
		id,
		title,
		slug,
		summary,
		impact,
		content,
		category,
		status,
		repositoryUrl,
		liveUrl,
		visible,
		createdAt,
		updatedAt,
		highlights,
		techs,
	}: RestoreProps): Project {
		return new Project({
			id,
			title,
			slug,
			summary,
			impact,
			content,
			category,
			status,
			repositoryUrl,
			liveUrl,
			visible,
			createdAt,
			updatedAt,
			highlights,
			techs,
		});
	}

	get highlights(): ProjectHighlight[] {
		return [...this._highlights];
	}

	get techs(): ProjectTech[] {
		return [...this._techs];
	}
}

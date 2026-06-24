import type { Highlight } from "../dto";

export type ProjectCategory =
	| "fullstack"
	| "frontend"
	| "backend"
	| "cli"
	| "mobile";

export const categoryLabels: Record<ProjectCategory, string> = {
	fullstack: "Full Stack",
	frontend: "Frontend",
	backend: "Backend",
	cli: "CLI",
	mobile: "Mobile",
};

export const categoryKeys = Object.keys(categoryLabels).map((key) => key);

export type ProjectStatus = "active" | "wip" | "archived";

export const statusColors: Record<ProjectStatus, string> = {
	active: "text-emerald-500",
	wip: "text-amber-500",
	archived: "text-muted-foreground",
};

export type ProjectDTO = {
	id: string;
	title: string;
	slug: string;
	summary: string;
	impact?: string;
	content?: string;
	highlights?: Highlight[];
	category: ProjectCategory;
	status: ProjectStatus;
	tech?: string[];
	repositoryUrl?: string;
	liveUrl?: string;
	visible: boolean;
	createdAt: string;
	updatedAt: string;
};

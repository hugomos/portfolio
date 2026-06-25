export type WorkMode = "remote" | "hybrid" | "onsite";

export type CompanyDTO = {
	id: string;
	name: string;
	website: string | null;
};

export type ExperienceDTO = {
	id: string;
	role: string;
	workMode: WorkMode;
	startDate: string;
	endDate: string | null;
	visible: boolean;
	company: CompanyDTO;
	highlights: Array<{ content: string; sortOrder: number }>;
};

export const workModeLabel: Record<WorkMode, string> = {
	remote: "Remote",
	hybrid: "Hybrid",
	onsite: "On-site",
};

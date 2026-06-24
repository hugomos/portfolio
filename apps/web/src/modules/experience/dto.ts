export type WorkMode = "remote" | "hybrid" | "onsite";

export type Highlight = {
	id: string;
	content: string;
	sortOrder: number;
};

export type ExperienceDTO = {
	id: string;
	company: {
		name: string;
		website?: string;
	};
	role: string;
	workMode: WorkMode;
	startDate: string;
	endDate?: string;
	highlights: Highlight[];
	visible: boolean;
	createdAt: string;
	updatedAt: string;
};

export const workModeLabel: Record<ExperienceDTO["workMode"], string> = {
	remote: "Remote",
	hybrid: "Hybrid",
	onsite: "On-site",
};

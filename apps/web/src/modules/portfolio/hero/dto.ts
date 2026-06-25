export type Skill = {
	name: string;
	sortOrder: number;
};

export type HeroDTO = {
	id: string;
	name: string;
	title: string;
	bio: string;
	resumeUrl: string | null;
	githubUrl: string | null;
	linkedinUrl: string | null;
	skills: Skill[];
};

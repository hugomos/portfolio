export type Skill = {
	id: string;
	name: string;
	sortOrder: number;
};

export type HeroDTO = {
	name: string;
	title: string;
	bio: string;
	skills: Skill[];
	links: {
		resumeUrl?: string;
		githubUrl?: string;
		linkedinUrl?: string;
	};
};

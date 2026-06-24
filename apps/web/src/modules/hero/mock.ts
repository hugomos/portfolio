import type { HeroDTO } from "./dto";

export const mock: HeroDTO = {
	name: "Vitor Hugo Oliveira",
	title: "Software Engineer",
	bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
	skills: [
		{ id: "s1", name: "Python", sortOrder: 1 },
		{ id: "s2", name: "QGIS", sortOrder: 2 },
		{ id: "s3", name: "TypeScript", sortOrder: 3 },
		{ id: "s4", name: "React", sortOrder: 4 },
		{ id: "s5", name: "Fastify", sortOrder: 5 },
		{ id: "s6", name: "PostgreSQL", sortOrder: 6 },
	],
	links: {
		resumeUrl: undefined,
		githubUrl: "https://github.com/hugomos",
		linkedinUrl: "https://www.linkedin.com/in/hugomos/",
	},
};

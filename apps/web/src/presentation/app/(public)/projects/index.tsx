import type React from "react";
import { SectionTitle } from "../@components/section-title";
import { ProjectGroup } from "./@components/project-group";
import type { Project } from "./@components/project-item";

const CATEGORY_ORDER = ["fullstack", "frontend", "backend"] as const;

const CATEGORY_LABELS: Record<(typeof CATEGORY_ORDER)[number], string> = {
	fullstack: "Full Stack",
	frontend: "Frontend",
	backend: "Backend",
};

const projects: Project[] = [
	{
		id: "1",
		slug: "projeto-a",
		title: "Projeto A",
		category: "fullstack",
		summary:
			"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.",
		impact: "Reduziu o tempo de processamento em 40%.",
		tech: ["React", "TypeScript", "PostgreSQL", "Fastify"],
	},
	{
		id: "2",
		slug: "projeto-b",
		title: "Projeto B",
		category: "fullstack",
		summary:
			"Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
		impact: "Aumentou a retenção de usuários em 25%.",
		tech: ["Next.js", "Prisma", "Redis"],
	},
	{
		id: "3",
		slug: "projeto-c",
		title: "Projeto C",
		category: "frontend",
		summary:
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		impact: "Melhorou o tempo de carregamento em 60%.",
		tech: ["React", "Tailwind CSS", "Vite"],
	},
	{
		id: "4",
		slug: "projeto-d",
		title: "Projeto D",
		category: "backend",
		summary:
			"Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est.",
		impact: "Processou mais de 1 milhão de requisições por dia.",
		tech: ["Python", "FastAPI", "PostgreSQL", "QGIS"],
	},
];

export const Projects: React.FC = () => {
	const grouped = CATEGORY_ORDER.map((cat) => ({
		category: cat,
		label: CATEGORY_LABELS[cat],
		projects: projects.filter((p) => p.category === cat),
	})).filter((g) => g.projects.length > 0);

	return (
		<div className="space-y-8">
			<SectionTitle as="h2">Projects</SectionTitle>
			<div className="space-y-10">
				{grouped.map((group) => (
					<ProjectGroup
						key={group.category}
						label={group.label}
						projects={group.projects}
					/>
				))}
			</div>
		</div>
	);
};

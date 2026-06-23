import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { SectionTitle } from "@/presentation/components/section-title";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { type Project, ProjectItem } from "./@components/project-item";

const mock: Project[] = [
	{
		id: "1",
		slug: "projeto-a",
		title: "Projeto A",
		category: "fullstack",
		summary: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
		impact: "Reduziu o tempo de processamento em 40%.",
		tech: ["React", "TypeScript", "PostgreSQL", "Fastify"],
		visible: true,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-06-01T00:00:00Z",
	},
	{
		id: "2",
		slug: "projeto-b",
		title: "Projeto B",
		category: "fullstack",
		summary: "Ut enim ad minim veniam quis nostrud exercitation ullamco.",
		impact: "Aumentou a retenção de usuários em 25%.",
		tech: ["Next.js", "Prisma", "Redis"],
		visible: true,
		createdAt: "2023-06-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "3",
		slug: "projeto-c",
		title: "Projeto C",
		category: "frontend",
		summary: "Duis aute irure dolor in reprehenderit in voluptate velit.",
		impact: "Melhorou o tempo de carregamento em 60%.",
		tech: ["React", "Tailwind CSS", "Vite"],
		visible: false,
		createdAt: "2023-01-01T00:00:00Z",
		updatedAt: "2023-12-01T00:00:00Z",
	},
	{
		id: "4",
		slug: "projeto-d",
		title: "Projeto D",
		category: "backend",
		summary: "Excepteur sint occaecat cupidatat non proident sunt in culpa.",
		impact: "Processou mais de 1 milhão de requisições por dia.",
		tech: ["Python", "FastAPI", "PostgreSQL"],
		visible: true,
		createdAt: "2022-01-01T00:00:00Z",
		updatedAt: "2023-06-01T00:00:00Z",
	},
];

export const Projects: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>(mock);

	function handleDelete(id: string) {
		setProjects((prev) => prev.filter((p) => p.id !== id));
	}

	function handleToggleVisible(id: string, visible: boolean) {
		setProjects((prev) =>
			prev.map((p) => (p.id === id ? { ...p, visible } : p)),
		);
	}

	return (
		<main className="space-y-6">
			<div className="flex items-center justify-between">
				<SectionTitle as="h1">Projects</SectionTitle>
				<Button variant="outline" size="sm" asChild>
					<Link to="/~/admin/projects/new">
						<Plus data-icon="inline-start" />
						Add project
					</Link>
				</Button>
			</div>

			{projects.length === 0 ? (
				<p className="text-muted-foreground text-sm">No projects yet.</p>
			) : (
				<div className="space-y-6">
					{projects.map((project, index) => (
						<div key={project.id} className="space-y-6">
							<ProjectItem
								project={project}
								onDelete={handleDelete}
								onToggleVisible={handleToggleVisible}
							/>
							{index < projects.length - 1 && <Separator />}
						</div>
					))}
				</div>
			)}
		</main>
	);
};

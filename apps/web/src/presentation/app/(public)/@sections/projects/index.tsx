import type React from "react";
import type { ProjectDTO } from "@/modules/portfolio/project/dto";
import { categoryLabels, categoryOrder } from "@/modules/portfolio/project/dto";
import { SectionTitle } from "@/presentation/components/section-title";
import { ProjectGroup } from "./@components/project-group";

interface ProjectsProps {
	projects: ProjectDTO[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
	if (!projects.length) return null;

	const grouped = categoryOrder
		.map((cat) => ({
			category: cat,
			label: categoryLabels[cat],
			projects: projects.filter((p) => p.category === cat),
		}))
		.filter((g) => g.projects.length > 0);

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

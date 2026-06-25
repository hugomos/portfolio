import type React from "react";
import { categoryLabels, categoryOrder } from "@/modules/portfolio/project/dto";
import { useProjects } from "@/modules/portfolio/project/hooks/use-projects";
import { SectionTitle } from "@/presentation/components/section-title";
import { ProjectGroup } from "./@components/project-group";
import { ProjectsSkeleton } from "./@components/projects-skeleton";

export const Projects: React.FC = () => {
	const { projects, projectsIsLoading } = useProjects({ visible: true });

	if (projectsIsLoading) return <ProjectsSkeleton />;

	const grouped = categoryOrder
		.map((cat) => ({
			category: cat,
			label: categoryLabels[cat],
			projects: (projects ?? []).filter((p) => p.category === cat),
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

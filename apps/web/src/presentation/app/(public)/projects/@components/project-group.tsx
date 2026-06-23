import { Separator } from "@/presentation/components/ui/separator";
import type React from "react";
import { type Project, ProjectItem } from "./project-item";

interface ProjectGroupProps {
	label: string;
	projects: Project[];
}

export const ProjectGroup: React.FC<ProjectGroupProps> = ({
	label,
	projects,
}) => {
	return (
		<div className="space-y-4">
			<h2 className="text-xs uppercase tracking-wider text-muted-foreground">
				{label}
			</h2>
			<div className="space-y-6">
				{projects.map((project, index) => (
					<div key={project.id} className="space-y-6">
						<ProjectItem project={project} />
						{index < projects.length - 1 && <Separator />}
					</div>
				))}
			</div>
		</div>
	);
};

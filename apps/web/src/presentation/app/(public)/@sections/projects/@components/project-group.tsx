import type React from "react";
import type { ProjectDTO } from "@/modules/project/dto";
import { Separator } from "@/presentation/components/ui/separator";
import { ProjectItem } from "./project-item";

interface ProjectGroupProps {
	label: string;
	projects: ProjectDTO[];
}

export const ProjectGroup: React.FC<ProjectGroupProps> = ({
	label,
	projects,
}) => {
	return (
		<div className="space-y-4">
			<h3 className="text-muted-foreground text-xs">{label}</h3>
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

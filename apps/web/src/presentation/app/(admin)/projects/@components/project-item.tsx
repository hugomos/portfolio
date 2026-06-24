import { Pencil, Trash2 } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { categoryLabels, type ProjectDTO } from "@/modules/project/dto";
import { useDeleteProject } from "@/modules/project/hooks/use-delete-project";
import { useToggleProjectVisibility } from "@/modules/project/hooks/use-toggle-project-visibility";
import { Button } from "@/presentation/components/ui/button";

import { Switch } from "@/presentation/components/ui/switch";

interface ProjectItemProps {
	project: ProjectDTO;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
	const { id, title, slug, category, tech, visible } = project;

	const { handleDeleteProject, deleteProjectIsPending } = useDeleteProject();
	const { handleToggleProjectVisibility } = useToggleProjectVisibility();

	return (
		<article className="flex items-start justify-between gap-4">
			<div className="space-y-1">
				<div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
					<span className="font-medium text-sm">{title}</span>
					<span className="text-muted-foreground text-sm">·</span>
					<span className="text-muted-foreground text-sm">/{slug}</span>
				</div>
				<p className="text-muted-foreground text-xs">
					{categoryLabels[category]}
					{` · ${tech?.join(", ")}`}
				</p>
			</div>

			<div className="flex shrink-0 items-center gap-3">
				<Switch
					checked={visible}
					onCheckedChange={(checked) =>
						handleToggleProjectVisibility({ id, visible: !checked })
					}
					aria-label="Toggle visibility"
				/>
				<div className="flex items-center gap-1">
					<Button
						variant="ghost"
						size="icon"
						className="text-muted-foreground"
						asChild
					>
						<Link to={`/~/admin/projects/${id}`}>
							<Pencil />
							<span className="sr-only">Edit</span>
						</Link>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-muted-foreground hover:text-destructive"
						onClick={() => handleDeleteProject({ id })}
						disabled={deleteProjectIsPending}
					>
						<Trash2 />
						<span className="sr-only">Delete</span>
					</Button>
				</div>
			</div>
		</article>
	);
};

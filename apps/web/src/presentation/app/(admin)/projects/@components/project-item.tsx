import { Pencil, Trash2 } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { Button } from "@/presentation/components/ui/button";
import { Switch } from "@/presentation/components/ui/switch";

export interface Project {
	id: string;
	slug: string;
	title: string;
	category: "fullstack" | "frontend" | "backend";
	summary: string;
	impact: string;
	tech: string[];
	visible: boolean;
	createdAt: string;
	updatedAt: string;
}

interface ProjectItemProps {
	project: Project;
	onDelete: (id: string) => void;
	onToggleVisible: (id: string, visible: boolean) => void;
}

const categoryLabel: Record<Project["category"], string> = {
	fullstack: "Full Stack",
	frontend: "Frontend",
	backend: "Backend",
};

export const ProjectItem: React.FC<ProjectItemProps> = ({
	project,
	onDelete,
	onToggleVisible,
}) => {
	const { id, title, slug, category, tech, visible } = project;

	return (
		<article className="flex items-start justify-between gap-4">
			<div className="space-y-1">
				<div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
					<span className="font-medium text-sm">{title}</span>
					<span className="text-muted-foreground text-sm">·</span>
					<span className="text-muted-foreground text-sm">/{slug}</span>
				</div>
				<p className="text-muted-foreground text-xs">
					{categoryLabel[category]}
					{tech.length > 0 && ` · ${tech.join(", ")}`}
				</p>
			</div>

			<div className="flex shrink-0 items-center gap-3">
				<Switch
					checked={visible}
					onCheckedChange={(checked) => onToggleVisible(id, checked)}
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
						onClick={() => onDelete(id)}
					>
						<Trash2 />
						<span className="sr-only">Delete</span>
					</Button>
				</div>
			</div>
		</article>
	);
};

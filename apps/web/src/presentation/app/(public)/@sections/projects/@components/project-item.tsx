import { ArrowUpRight } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import type { ProjectDTO } from "@/modules/portfolio/project/dto";

interface ProjectItemProps {
	project: ProjectDTO;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
	const { slug, title, summary, impact, techs } = project;

	return (
		<article className="space-y-2">
			<span className="sr-only">{techs?.map((t) => t.name).join(", ")}</span>

			<Link
				to={`/projects/${slug}`}
				className="group inline-flex items-center gap-1 font-medium text-sm hover:underline"
			>
				{title}
				<ArrowUpRight className="size-3 text-muted-foreground transition-colors group-hover:text-foreground" />
			</Link>

			<p className="text-muted-foreground text-sm">{summary}</p>
			<p className="text-muted-foreground/60 text-xs">{impact}</p>

			{techs && techs.length > 0 && (
				<div className="flex flex-wrap gap-1.5">
					{techs.map((t) => (
						<span
							key={t.name}
							className="rounded border border-border px-2 py-0.5 text-muted-foreground text-xs"
						>
							{t.name}
						</span>
					))}
				</div>
			)}
		</article>
	);
};

import { ArrowUpRight } from "lucide-react";
import type React from "react";
import { Link } from "react-router";

export interface Project {
	id: string;
	slug: string;
	title: string;
	category: "fullstack" | "frontend" | "backend";
	summary: string;
	impact: string;
	tech?: string[];
}

interface ProjectItemProps {
	project: Project;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
	const { slug, title, summary, impact, tech } = project;

	return (
		<article className="space-y-2">
			<span className="sr-only">{tech?.join(", ")}</span>

			<Link
				to={`/projects/${slug}`}
				className="group inline-flex items-center gap-1 font-medium text-sm hover:underline"
			>
				{title}
				<ArrowUpRight className="size-3 text-muted-foreground transition-colors group-hover:text-foreground" />
			</Link>

			<p className="text-sm text-muted-foreground">{summary}</p>
			<p className="text-xs text-muted-foreground/60">{impact}</p>

			{tech && tech.length > 0 && (
				<div className="flex flex-wrap gap-1.5">
					{tech.map((t) => (
						<span
							key={t}
							className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground"
						>
							{t}
						</span>
					))}
				</div>
			)}
		</article>
	);
};

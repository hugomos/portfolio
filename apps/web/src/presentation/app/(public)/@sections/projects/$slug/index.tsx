import { GithubLogoIcon } from "@phosphor-icons/react";
import { ArrowLeft, Globe } from "lucide-react";
import type React from "react";
import { Link, useNavigate, useParams } from "react-router";
import { categoryLabels, statusColors } from "@/modules/portfolio/project/dto";
import { useProjects } from "@/modules/portfolio/project/hooks/use-projects";
import { SectionTitle } from "@/presentation/components/section-title";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { Skeleton } from "@/presentation/components/ui/skeleton";
import { MarkdownContent } from "./components/markdown-content";

export const ProjectDetail: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const { projects, projectsIsLoading } = useProjects({ visible: true });
	const project = projects?.find((p) => p.slug === slug);

	const navigate = useNavigate();

	if (projectsIsLoading) {
		return (
			<div className="space-y-8">
				<Skeleton className="h-3 w-8" />
				<div className="space-y-3">
					<Skeleton className="h-6 w-48" />
					<Skeleton className="h-3 w-32" />
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-4/5" />
				</div>
				<div className="flex gap-2">
					<Skeleton className="h-8 w-20 rounded" />
					<Skeleton className="h-8 w-16 rounded" />
				</div>
				<div className="flex gap-1.5">
					<Skeleton className="h-5 w-16 rounded" />
					<Skeleton className="h-5 w-20 rounded" />
					<Skeleton className="h-5 w-14 rounded" />
				</div>
				<Separator />
				<div className="space-y-4">
					<Skeleton className="h-3 w-20" />
					<div className="space-y-2">
						<Skeleton className="h-3 w-full" />
						<Skeleton className="h-3 w-5/6" />
						<Skeleton className="h-3 w-4/5" />
					</div>
				</div>
			</div>
		);
	}

	if (!project) {
		return (
			<div className="space-y-8">
				<button
					type="button"
					onClick={() => navigate(-1)}
					className="inline-flex items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground"
				>
					<ArrowLeft className="size-3" />
					back
				</button>
				<p className="text-muted-foreground text-sm">Project not found.</p>
			</div>
		);
	}

	const {
		title,
		category,
		status,
		summary,
		impact,
		techs,
		repositoryUrl,
		liveUrl,
		highlights,
		content,
	} = project;

	return (
		<div className="space-y-8">
			<button
				type="button"
				onClick={() => navigate(-1)}
				className="inline-flex items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground"
			>
				<ArrowLeft className="size-3" />
				back
			</button>

			<header className="space-y-3">
				<h1 className="font-bold text-xl tracking-tight sm:text-2xl">
					{title}
				</h1>

				<div className="flex flex-wrap items-center gap-2 text-xs">
					<span className="text-muted-foreground">
						{categoryLabels[category]}
					</span>
					<span className="text-muted-foreground">·</span>
					<span className={statusColors[status]}>{status}</span>
				</div>

				<p className="text-muted-foreground text-sm leading-relaxed">
					{summary}
				</p>
				<p className="text-muted-foreground/60 text-xs">{impact}</p>
			</header>

			{(repositoryUrl || liveUrl) && (
				<div className="flex flex-wrap gap-3">
					{repositoryUrl && (
						<Button variant="outline" size="sm" className="group" asChild>
							<Link
								to={repositoryUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<GithubLogoIcon className="mr-2 size-4 text-zinc-400 transition-colors group-hover:text-foreground" />
								GitHub
							</Link>
						</Button>
					)}
					{liveUrl && (
						<Button variant="outline" size="sm" className="group" asChild>
							<Link to={liveUrl} target="_blank" rel="noopener noreferrer">
								<Globe className="mr-2 size-4 text-zinc-400 transition-colors group-hover:text-foreground" />
								Live
							</Link>
						</Button>
					)}
				</div>
			)}

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

			<Separator />

			{highlights && highlights.length > 0 && (
				<>
					<div className="space-y-4">
						<SectionTitle>highlights</SectionTitle>
						<ul className="space-y-2">
							{highlights.map((h) => (
								<li
									key={h.sortOrder}
									className="flex gap-2 text-muted-foreground text-sm"
								>
									<span
										aria-hidden="true"
										className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/40"
									/>
									<span>{h.content}</span>
								</li>
							))}
						</ul>
					</div>
					<Separator />
				</>
			)}

			{content && <MarkdownContent content={content} />}
		</div>
	);
};

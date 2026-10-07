import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Globe } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabels, statusColors } from "@/modules/portfolio/project/dto";
import {
	getProjectsServerSide,
} from "@/lib/server-api";
import { MarkdownContent } from "@/presentation/app/(public)/@sections/projects/$slug/components/markdown-content";
import { SectionTitle } from "@/presentation/components/section-title";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { BackButton } from "./components/back-button";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
	try {
		const projects = await getProjectsServerSide();
		return projects
			.filter((p) => p.visible)
			.map((p) => ({ slug: p.slug }));
	} catch {
		return [];
	}
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	let projects: Awaited<ReturnType<typeof getProjectsServerSide>> = [];
	try {
		projects = await getProjectsServerSide();
	} catch {
		notFound();
	}
	const project = projects.find((p) => p.slug === slug && p.visible);

	if (!project) notFound();

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
			<BackButton />

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
				{impact && (
					<p className="text-muted-foreground/60 text-xs">{impact}</p>
				)}
			</header>

			{(repositoryUrl || liveUrl) && (
				<div className="flex flex-wrap gap-3">
					{repositoryUrl && (
						<Button variant="outline" size="sm" className="group" asChild>
							<Link href={repositoryUrl} target="_blank" rel="noopener noreferrer">
								<GithubLogoIcon className="mr-2 size-4 text-zinc-400 transition-colors group-hover:text-foreground" />
								GitHub
							</Link>
						</Button>
					)}
					{liveUrl && (
						<Button variant="outline" size="sm" className="group" asChild>
							<Link href={liveUrl} target="_blank" rel="noopener noreferrer">
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
}

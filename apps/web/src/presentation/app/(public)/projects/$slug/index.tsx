import { GithubLogoIcon } from "@phosphor-icons/react";
import { ArrowLeft, Globe } from "lucide-react";
import type React from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { SectionTitle } from "../../@components/section-title";
import { MarkdownContent } from "./components/markdown-content"

const STATUS_STYLES: Record<string, string> = {
	active: "text-emerald-500",
	wip: "text-amber-500",
	archived: "text-muted-foreground",
};

const CATEGORY_LABELS: Record<string, string> = {
	fullstack: "full stack",
	frontend: "frontend",
	backend: "backend",
};

const project = {
	id: "1",
	slug: "projeto-a",
	title: "Projeto A",
	category: "fullstack",
	summary:
		"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.",
	impact:
		"Reduziu o tempo de processamento em 40% e aumentou a capacidade de 10k para 50k usuários.",
	tech: ["React", "TypeScript", "PostgreSQL", "Fastify"],
	status: "active",
	githubUrl: "https://github.com/hugomos",
	liveUrl: null,
	highlights: [
		{
			id: "h1",
			content: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do.",
			sortOrder: 1,
		},
		{
			id: "h2",
			content: "Ut enim ad minim veniam quis nostrud exercitation ullamco.",
			sortOrder: 2,
		},
		{
			id: "h3",
			content:
				"Duis aute irure dolor in reprehenderit in voluptate velit esse.",
			sortOrder: 3,
		},
	],
	content: `## Contexto

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.

## Arquitetura

\`\`\`mermaid
graph TD
  A[Client] --> B[API Fastify]
  B --> C[PostgreSQL]
  B --> D[Redis Cache]
  C --> E[Backup]
\`\`\`

## Implementação

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

\`\`\`typescript
const app = fastify({ logger: true })

app.get('/health', async () => ({ status: 'ok' }))

await app.listen({ port: 3000 })
\`\`\`

## Decisões técnicas

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
};

export const ProjectDetail: React.FC = () => {
	const navigate = useNavigate();
	const {
		title,
		category,
		status,
		summary,
		impact,
		tech,
		githubUrl,
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
						<span aria-hidden="true" className="mr-1 select-none">
							{/*  */}
						</span>
						{CATEGORY_LABELS[category]}
					</span>
					<span className="text-muted-foreground">·</span>
					<span className={STATUS_STYLES[status]}>{status}</span>
				</div>

				<p className="text-muted-foreground text-sm leading-relaxed">
					{summary}
				</p>
				<p className="text-muted-foreground/60 text-xs">{impact}</p>
			</header>

			{(githubUrl || liveUrl) && (
				<div className="flex flex-wrap gap-3">
					{githubUrl && (
						<Button variant="outline" size="sm" className="group" asChild>
							<Link to={githubUrl} target="_blank" rel="noopener noreferrer">
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

			{tech && tech.length > 0 && (
				<div className="flex flex-wrap gap-1.5">
					{tech.map((t) => (
						<span
							key={t}
							className="rounded border border-border px-2 py-0.5 text-muted-foreground text-xs"
						>
							{t}
						</span>
					))}
				</div>
			)}

			<Separator />

			<div className="space-y-4">
				<SectionTitle>highlights</SectionTitle>
				<ul className="space-y-2">
					{highlights.map((h) => (
						<li key={h.id} className="flex gap-2 text-muted-foreground text-sm">
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

			<MarkdownContent content={content} />
		</div>
	);
};

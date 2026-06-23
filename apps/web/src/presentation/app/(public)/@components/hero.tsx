import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { File } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { Button } from "@/presentation/components/ui/button";

export const Hero: React.FC = () => {
	return (
		<section className="space-y-6">
			<header className="space-y-1">
				<h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
					Vitor Hugo Oliveira
				</h1>
				<p className="text-sm uppercase tracking-widest text-muted-foreground">
					Software Engineer
				</p>
			</header>

			<p className="text-sm leading-relaxed text-muted-foreground">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris.
			</p>

			<ul className="flex list-inside list-disc flex-wrap gap-x-4 text-sm text-muted-foreground">
				<li className="list-none">Python</li>
				<li>QGIS</li>
				<li>Typescript</li>
				<li>React</li>
				<li>Fastify</li>
				<li>PostgreSQL</li>
			</ul>

			<div className="flex flex-wrap gap-3">
				<Button variant="outline" size="sm" className="group" asChild>
					<Link
						to="https://github.com/hugomos"
						target="_blank"
						rel="noopener noreferrer"
					>
						<File className="mr-2 size-4 text-zinc-400 transition-colors group-hover:text-foreground" />
						Resume
					</Link>
				</Button>
				<Button variant="outline" size="sm" className="group" asChild>
					<Link
						to="https://github.com/hugomos"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GithubLogoIcon className="mr-2 size-4 text-zinc-400 transition-colors group-hover:text-foreground" />
						Github
					</Link>
				</Button>
				<Button variant="outline" size="sm" className="group" asChild>
					<Link
						to="https://www.linkedin.com/in/hugomos/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<LinkedinLogoIcon className="mr-2 size-4 text-zinc-400 transition-colors group-hover:text-sky-600" />
						Linkedin
					</Link>
				</Button>
			</div>
		</section>
	);
};

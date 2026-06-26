import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { File } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import type { HeroDTO } from "@/modules/portfolio/hero/dto";
import { Button } from "@/presentation/components/ui/button";

interface HeroProps {
	hero: HeroDTO;
}

export const Hero: React.FC<HeroProps> = ({ hero }) => {
	return (
		<section className="space-y-6">
			<header className="space-y-1">
				<h1 className="font-bold text-2xl leading-tight tracking-tight sm:text-3xl">
					{hero.name}
				</h1>
				<p className="text-muted-foreground text-sm uppercase tracking-widest">
					{hero.title}
				</p>
			</header>

			<p className="text-muted-foreground text-sm leading-relaxed">
				{hero.bio}
			</p>

			<ul className="flex list-inside list-disc flex-wrap gap-x-4 text-muted-foreground text-sm">
				{hero.skills
					.slice()
					.sort((a, b) => a.sortOrder - b.sortOrder)
					.map((skill, index) => (
						<li
							key={skill.name}
							className={index === 0 ? "list-none" : undefined}
						>
							{skill.name}
						</li>
					))}
			</ul>

			<div className="flex flex-wrap gap-3">
				{hero.resumeUrl && (
					<Button variant="outline" size="sm" className="group" asChild>
						<Link to={hero.resumeUrl} target="_blank" rel="noopener noreferrer">
							<File className="mr-2 size-4 text-zinc-400 transition-colors group-hover:text-foreground" />
							Resume
						</Link>
					</Button>
				)}
				{hero.githubUrl && (
					<Button variant="outline" size="sm" className="group" asChild>
						<Link to={hero.githubUrl} target="_blank" rel="noopener noreferrer">
							<GithubLogoIcon className="mr-2 size-4 text-zinc-400 transition-colors group-hover:text-foreground" />
							Github
						</Link>
					</Button>
				)}
				{hero.linkedinUrl && (
					<Button variant="outline" size="sm" className="group" asChild>
						<Link
							to={hero.linkedinUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							<LinkedinLogoIcon className="mr-2 size-4 text-zinc-400 transition-colors group-hover:text-sky-600" />
							Linkedin
						</Link>
					</Button>
				)}
			</div>
		</section>
	);
};

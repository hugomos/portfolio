import { Experience } from "@/presentation/app/(public)/@sections/experience";
import { Hero } from "@/presentation/app/(public)/@sections/hero";
import { Projects } from "@/presentation/app/(public)/@sections/projects";
import type { ExperienceDTO } from "@/modules/portfolio/experience/dto";
import type { HeroDTO } from "@/modules/portfolio/hero/dto";
import type { ProjectDTO } from "@/modules/portfolio/project/dto";
import {
	getExperiencesServerSide,
	getHeroServerSide,
	getProjectsServerSide,
} from "@/lib/server-api";

export const revalidate = 3600;

export default async function HomePage() {
	let hero: HeroDTO | null = null;
	let allProjects: ProjectDTO[] = [];
	let allExperiences: ExperienceDTO[] = [];

	try {
		[hero, allProjects, allExperiences] = await Promise.all([
			getHeroServerSide(),
			getProjectsServerSide(),
			getExperiencesServerSide(),
		]);
	} catch {
		// API unavailable — ISR will populate on next revalidation
	}

	const projects = allProjects.filter((p) => p.visible);
	const experiences = allExperiences.filter((e) => e.visible);

	return (
		<main className="space-y-12">
			{hero && <Hero hero={hero} />}
			<Experience experiences={experiences} />
			<Projects projects={projects} />
		</main>
	);
}

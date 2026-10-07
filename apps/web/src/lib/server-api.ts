import type { ExperienceDTO } from "@/modules/portfolio/experience/dto";
import type { HeroDTO } from "@/modules/portfolio/hero/dto";
import type { ProjectDTO } from "@/modules/portfolio/project/dto";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

async function apiFetch<T>(path: string): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		next: { tags: ["portfolio"] },
	});
	if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
	return res.json() as Promise<T>;
}

export function getHeroServerSide(): Promise<HeroDTO> {
	return apiFetch<HeroDTO>("/api/portfolio/hero");
}

export function getProjectsServerSide(): Promise<ProjectDTO[]> {
	return apiFetch<ProjectDTO[]>("/api/portfolio/projects");
}

export function getExperiencesServerSide(): Promise<ExperienceDTO[]> {
	return apiFetch<ExperienceDTO[]>("/api/portfolio/experiences");
}

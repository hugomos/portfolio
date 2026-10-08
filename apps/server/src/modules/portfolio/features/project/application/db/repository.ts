import type { Project } from "@/modules/portfolio/domain/entity/project";
import type { ProjectHighlight } from "@/modules/portfolio/domain/entity/project-highlight";
import type { ProjectSocialLink } from "@/modules/portfolio/domain/entity/project-social-link";
import type { ProjectTech } from "@/modules/portfolio/domain/entity/project-tech";

export interface ProjectRepo {
	findById(id: string): Promise<Project | null>;
	findBySlug(slug: string): Promise<Project | null>;
	list(): Promise<Project[]>;
	create(project: Project): Promise<void>;
	update(project: Project): Promise<void>;
	delete(id: string): Promise<void>;
	replaceHighlights(projectId: string, highlights: ProjectHighlight[]): Promise<void>;
	replaceTechs(projectId: string, techs: ProjectTech[]): Promise<void>;
	replaceSocialLinks(projectId: string, socialLinks: ProjectSocialLink[]): Promise<void>;
}

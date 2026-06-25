import { CreateProjectUseCase } from "../../application/use-case/create";
import { DeleteProjectUseCase } from "../../application/use-case/delete";
import { ListProjectsUseCase } from "../../application/use-case/list";
import { ReplaceProjectHighlightsUseCase } from "../../application/use-case/replace-highlights";
import { ReplaceProjectTechsUseCase } from "../../application/use-case/replace-techs";
import { ToggleProjectActiveUseCase } from "../../application/use-case/toggle-active";
import { UpdateProjectUseCase } from "../../application/use-case/update";
import type { ProjectRepoDB } from "../db/repository";
import type { ProjectDBFactory } from "./db";

export class ProjectUseCaseFactory {
	private readonly repo: ProjectRepoDB;

	constructor(db: ProjectDBFactory) {
		this.repo = db.projectRepo;
	}

	get listProjects() {
		return new ListProjectsUseCase(this.repo);
	}

	get createProject() {
		return new CreateProjectUseCase(this.repo);
	}

	get updateProject() {
		return new UpdateProjectUseCase(this.repo);
	}

	get toggleActive() {
		return new ToggleProjectActiveUseCase(this.repo);
	}

	get replaceHighlights() {
		return new ReplaceProjectHighlightsUseCase(this.repo);
	}

	get replaceTechs() {
		return new ReplaceProjectTechsUseCase(this.repo);
	}

	get deleteProject() {
		return new DeleteProjectUseCase(this.repo);
	}
}

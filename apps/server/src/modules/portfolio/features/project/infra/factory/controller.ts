import { HttpController } from "@/infra/http/controller";
import type { ProjectUseCaseFactory } from "./use-case";

export class ProjectControllerFactory {
	constructor(private readonly useCaseFactory: ProjectUseCaseFactory) {}

	get listProjects() {
		return new HttpController(this.useCaseFactory.listProjects);
	}

	get createProject() {
		return new HttpController(this.useCaseFactory.createProject);
	}

	get updateProject() {
		return new HttpController(this.useCaseFactory.updateProject);
	}

	get toggleActive() {
		return new HttpController(this.useCaseFactory.toggleActive);
	}

	get replaceHighlights() {
		return new HttpController(this.useCaseFactory.replaceHighlights);
	}

	get replaceTechs() {
		return new HttpController(this.useCaseFactory.replaceTechs);
	}

	get deleteProject() {
		return new HttpController(this.useCaseFactory.deleteProject);
	}
}

import type React from "react";
import { FormProvider } from "react-hook-form";
import { useParams } from "react-router";
import type { ProjectDTO } from "@/modules/portfolio/project/dto";
import { useProjects } from "@/modules/portfolio/project/hooks/use-projects";
import { SectionTitle } from "@/presentation/components/section-title";
import { EditProjectForm } from "./components/edit-project-form";
import { useEditProjectForm } from "./components/edit-project-form/use-edit-project-form";

const EditProjectContent: React.FC<{ project: ProjectDTO }> = ({ project }) => {
	const form = useEditProjectForm(project);
	return (
		<main className="space-y-8">
			<SectionTitle as="h1">Edit project</SectionTitle>
			<FormProvider {...form}>
				<EditProjectForm id={project.id} slug={project.slug} initialContent={project.content} />
			</FormProvider>
		</main>
	);
};

export const EditProject: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const { projects } = useProjects({});
	const project = projects?.find((p) => p.id === id);

	if (!project) {
		return (
			<main className="space-y-8">
				<SectionTitle as="h1">Edit project</SectionTitle>
				<p className="text-muted-foreground text-sm">Project not found.</p>
			</main>
		);
	}

	return <EditProjectContent key={project.id} project={project} />;
};

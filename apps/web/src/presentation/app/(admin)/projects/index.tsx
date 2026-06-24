import { Plus } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { useProjects } from "@/modules/project/hooks/use-projects";
import { SectionTitle } from "@/presentation/components/section-title";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { ProjectItem } from "./@components/project-item";

export const Projects: React.FC = () => {
	const { projects } = useProjects({});

	return (
		<main className="space-y-6">
			<div className="flex items-center justify-between">
				<SectionTitle as="h1">Projects</SectionTitle>
				<Button variant="outline" size="sm" asChild>
					<Link to="/~/admin/projects/new">
						<Plus data-icon="inline-start" />
						Add project
					</Link>
				</Button>
			</div>

			{projects?.length === 0 ? (
				<p className="text-muted-foreground text-sm">No projects yet.</p>
			) : (
				<div className="space-y-6">
					{projects?.map((project, index) => (
						<div key={project.id} className="space-y-6">
							<ProjectItem project={project} />
							{index < projects.length - 1 && <Separator />}
						</div>
					))}
				</div>
			)}
		</main>
	);
};

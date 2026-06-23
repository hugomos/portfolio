import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { SectionTitle } from "@/presentation/components/section-title";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { type Experience, ExperienceItem } from "./@components/experience-item";

const mock: Experience[] = [
	{
		id: "1",
		company: { name: "Empresa X", website: "https://empresa-x.com" },
		role: "Software Engineer",
		workMode: "remote",
		startDate: "2022-03-01",
		endDate: null,
		highlights: [
			{
				id: "h1",
				content:
					"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.",
				sortOrder: 1,
			},
			{
				id: "h2",
				content:
					"Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi.",
				sortOrder: 2,
			},
		],
		visible: true,
		createdAt: "2022-03-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "2",
		company: { name: "Empresa Y", website: null },
		role: "Backend Developer",
		workMode: "hybrid",
		startDate: "2020-01-01",
		endDate: "2022-02-28",
		highlights: [
			{
				id: "h3",
				content:
					"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.",
				sortOrder: 1,
			},
			{
				id: "h4",
				content:
					"Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.",
				sortOrder: 2,
			},
		],
		visible: true,
		createdAt: "2020-01-01T00:00:00Z",
		updatedAt: "2022-03-01T00:00:00Z",
	},
];

export const Experiences: React.FC = () => {
	const [experiences, setExperiences] = useState<Experience[]>(mock);

	function handleDelete(id: string) {
		setExperiences((prev) => prev.filter((e) => e.id !== id));
	}

	function handleToggleVisible(id: string, visible: boolean) {
		setExperiences((prev) =>
			prev.map((e) => (e.id === id ? { ...e, visible } : e)),
		);
	}

	return (
		<main className="space-y-6">
			<div className="flex items-center justify-between">
				<SectionTitle as="h1">Experiences</SectionTitle>
				<Button variant="outline" size="sm">
					<Plus data-icon="inline-start" />
					Add experience
				</Button>
			</div>

			{experiences.length === 0 ? (
				<p className="text-muted-foreground text-sm">No experiences yet.</p>
			) : (
				<div className="space-y-6">
					{experiences.map((exp, index) => (
						<div key={exp.id} className="space-y-6">
							<ExperienceItem
								experience={exp}
								onDelete={handleDelete}
								onToggleVisible={handleToggleVisible}
							/>
							{index < experiences.length - 1 && <Separator />}
						</div>
					))}
				</div>
			)}
		</main>
	);
};

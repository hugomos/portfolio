import { Pencil, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import type React from "react";
import { Link } from "react-router";
import { Button } from "@/presentation/components/ui/button";
import { Switch } from "@/presentation/components/ui/switch";

export interface Experience {
	id: string;
	company: {
		name: string;
		website?: string | null;
	};
	role: string;
	workMode: "remote" | "hybrid" | "onsite";
	startDate: string;
	endDate?: string | null;
	highlights: {
		id: string;
		content: string;
		sortOrder: number;
	}[];
	visible: boolean;
	createdAt: string;
	updatedAt: string;
}

interface ExperienceItemProps {
	experience: Experience;
	onDelete: (id: string) => void;
	onToggleVisible: (id: string, visible: boolean) => void;
}

const workModeLabel: Record<Experience["workMode"], string> = {
	remote: "Remote",
	hybrid: "Hybrid",
	onsite: "On-site",
};

function formatDate(dateStr: string): string {
	return format(parseISO(dateStr), "MMM yyyy");
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
	experience,
	onDelete,
	onToggleVisible,
}) => {
	const { id, company, role, workMode, startDate, endDate, highlights, visible } =
		experience;

	const start = formatDate(startDate);
	const end = endDate ? formatDate(endDate) : "present";
	const highlightCount = highlights.length;

	return (
		<article className="flex items-start justify-between gap-4">
			<div className="space-y-1">
				<div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
					<span className="font-medium text-sm">{company.name}</span>
					<span className="text-muted-foreground text-sm">·</span>
					<span className="text-sm">{role}</span>
				</div>
				<p className="text-muted-foreground text-xs">
					{start} – {end} · {highlightCount}{" "}
					{highlightCount === 1 ? "highlight" : "highlights"} ·{" "}
					{workModeLabel[workMode]}
				</p>
			</div>

			<div className="flex shrink-0 items-center gap-3">
				<Switch
					checked={visible}
					onCheckedChange={(checked) => onToggleVisible(id, checked)}
					aria-label="Toggle visibility"
				/>
				<div className="flex items-center gap-1">
					<Button variant="ghost" size="icon" className="text-muted-foreground" asChild>
						<Link to={`/~/admin/experiences/${id}`}>
							<Pencil />
							<span className="sr-only">Edit</span>
						</Link>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-muted-foreground hover:text-destructive"
						onClick={() => onDelete(id)}
					>
						<Trash2 />
						<span className="sr-only">Delete</span>
					</Button>
				</div>
			</div>
		</article>
	);
};

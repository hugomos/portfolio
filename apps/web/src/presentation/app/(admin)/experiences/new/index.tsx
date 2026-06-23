import { GripVertical, Plus, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { List, arrayMove } from "react-movable";
import { SectionTitle } from "@/presentation/components/section-title";
import { Button } from "@/presentation/components/ui/button";
import {
	Field,
	FieldGroup,
	FieldLabel,
} from "@/presentation/components/ui/field";
import { Input } from "@/presentation/components/ui/input";
import { ScrollArea } from "@/presentation/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/presentation/components/ui/select";
import { Switch } from "@/presentation/components/ui/switch";
import { Textarea } from "@/presentation/components/ui/textarea";
import { DatePicker } from "@/presentation/components/ui/date-picker";

interface Highlight {
	id: string;
	content: string;
}

interface FormState {
	companyName: string;
	companyWebsite: string;
	role: string;
	workMode: "remote" | "hybrid" | "onsite" | "";
	startDate: Date | undefined;
	endDate: Date | undefined;
	highlights: Highlight[];
	visible: boolean;
}

export const NewExperience: React.FC = () => {
	const [form, setForm] = useState<FormState>({
		companyName: "",
		companyWebsite: "",
		role: "",
		workMode: "",
		startDate: undefined,
		endDate: undefined,
		highlights: [],
		visible: true,
	});

	function addHighlight() {
		setForm((prev) => ({
			...prev,
			highlights: [
				...prev.highlights,
				{ id: crypto.randomUUID(), content: "" },
			],
		}));
	}

	function updateHighlight(id: string, content: string) {
		setForm((prev) => ({
			...prev,
			highlights: prev.highlights.map((h) =>
				h.id === id ? { ...h, content } : h,
			),
		}));
	}

	function removeHighlight(id: string) {
		setForm((prev) => ({
			...prev,
			highlights: prev.highlights.filter((h) => h.id !== id),
		}));
	}

	function reorderHighlights(oldIndex: number, newIndex: number) {
		setForm((prev) => ({
			...prev,
			highlights: arrayMove(prev.highlights, oldIndex, newIndex),
		}));
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		console.log({
			...form,
			highlights: form.highlights.map((h, i) => ({
				...h,
				sortOrder: i + 1,
			})),
		});
	}

	return (
		<main className="space-y-8">
			<SectionTitle as="h1">New experience</SectionTitle>

			<form onSubmit={handleSubmit} className="space-y-8">
				{/* Company */}
				<section className="space-y-4">
					<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						Company
					</p>
					<FieldGroup className="gap-4">
						<Field>
							<FieldLabel htmlFor="companyName">Name</FieldLabel>
							<Input
								id="companyName"
								value={form.companyName}
								onChange={(e) =>
									setForm((p) => ({ ...p, companyName: e.target.value }))
								}
								placeholder="Acme Corp"
								className="px-2"
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="companyWebsite">
								Website{" "}
								<span className="font-normal text-muted-foreground">
									(optional)
								</span>
							</FieldLabel>
							<Input
								id="companyWebsite"
								type="url"
								value={form.companyWebsite}
								onChange={(e) =>
									setForm((p) => ({ ...p, companyWebsite: e.target.value }))
								}
								placeholder="https://acme.com"
								className="px-2"
							/>
						</Field>
					</FieldGroup>
				</section>

				{/* Role & Work mode */}
				<FieldGroup className="gap-4">
					<Field>
						<FieldLabel htmlFor="role">Role</FieldLabel>
						<Input
							id="role"
							value={form.role}
							onChange={(e) =>
								setForm((p) => ({ ...p, role: e.target.value }))
							}
							placeholder="Software Engineer"
							className="px-2"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="workMode">Work mode</FieldLabel>
						<Select
							value={form.workMode}
							onValueChange={(v) =>
								setForm((p) => ({
									...p,
									workMode: v as FormState["workMode"],
								}))
							}
						>
							<SelectTrigger id="workMode" className="w-full">
								<SelectValue placeholder="Select..." />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="remote">Remote</SelectItem>
								<SelectItem value="hybrid">Hybrid</SelectItem>
								<SelectItem value="onsite">On-site</SelectItem>
							</SelectContent>
						</Select>
					</Field>
				</FieldGroup>

				{/* Dates */}
				<section className="space-y-4">
					<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						Period
					</p>
					<div className="grid gap-4 sm:grid-cols-2">
						<Field>
							<FieldLabel>Start date</FieldLabel>
							<DatePicker
								value={form.startDate}
								onChange={(d) => setForm((p) => ({ ...p, startDate: d }))}
							/>
						</Field>
						<Field>
							<FieldLabel>
								End date{" "}
								<span className="font-normal text-muted-foreground">
									(leave empty for present)
								</span>
							</FieldLabel>
							<DatePicker
								value={form.endDate}
								onChange={(d) => setForm((p) => ({ ...p, endDate: d }))}
								placeholder="Present"
							/>
						</Field>
					</div>
				</section>

				{/* Highlights */}
				<section className="space-y-4">
					<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						Highlights
					</p>

					{form.highlights.length > 0 && (
						<ScrollArea className="max-h-80">
							<List
								values={form.highlights}
								onChange={({ oldIndex, newIndex }) =>
									reorderHighlights(oldIndex, newIndex)
								}
								renderList={({ children, props }) => (
									<div className="space-y-3 pr-2" {...props}>
										{children}
									</div>
								)}
								renderItem={({ value, props, isDragged }) => (
									<div
										{...props}
										key={value.id}
										className={`flex items-start gap-2 ${isDragged ? "opacity-50" : ""}`}
									>
										<button
											data-movable-handle
											type="button"
											aria-label="Drag to reorder"
											className="mt-3 cursor-grab text-muted-foreground hover:text-foreground"
										>
											<GripVertical className="size-4" />
										</button>
										<Textarea
											value={value.content}
											onChange={(e) =>
												updateHighlight(value.id, e.target.value)
											}
											placeholder="Describe an achievement or responsibility..."
											className="flex-1 px-2"
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="mt-1 text-muted-foreground hover:text-destructive"
											onClick={() => removeHighlight(value.id)}
										>
											<X />
											<span className="sr-only">Remove highlight</span>
										</Button>
									</div>
								)}
							/>
						</ScrollArea>
					)}

					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={addHighlight}
					>
						<Plus data-icon="inline-start" />
						Add highlight
					</Button>
				</section>

				{/* Visible */}
				<Field orientation="horizontal">
					<FieldLabel htmlFor="visible">Visible on portfolio</FieldLabel>
					<Switch
						id="visible"
						checked={form.visible}
						onCheckedChange={(v) => setForm((p) => ({ ...p, visible: v }))}
					/>
				</Field>

				{/* Actions */}
				<div className="flex justify-end gap-3 pt-2">
					<Button type="button" variant="outline" asChild>
						<Link to="/~/admin/experiences">Cancel</Link>
					</Button>
					<Button type="submit">Create experience</Button>
				</div>
			</form>
		</main>
	);
};

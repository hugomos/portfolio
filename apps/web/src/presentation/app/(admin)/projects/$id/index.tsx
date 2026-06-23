import { X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { SectionTitle } from "@/presentation/components/section-title";
import { Button } from "@/presentation/components/ui/button";
import {
	Field,
	FieldGroup,
	FieldLabel,
} from "@/presentation/components/ui/field";
import { Input } from "@/presentation/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/presentation/components/ui/select";
import { Switch } from "@/presentation/components/ui/switch";
import { Textarea } from "@/presentation/components/ui/textarea";

interface FormState {
	title: string;
	slug: string;
	category: "fullstack" | "frontend" | "backend" | "";
	summary: string;
	impact: string;
	tech: string[];
	visible: boolean;
}

const mock: Record<string, FormState> = {
	"1": {
		title: "Projeto A",
		slug: "projeto-a",
		category: "fullstack",
		summary: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
		impact: "Reduziu o tempo de processamento em 40%.",
		tech: ["React", "TypeScript", "PostgreSQL", "Fastify"],
		visible: true,
	},
	"2": {
		title: "Projeto B",
		slug: "projeto-b",
		category: "fullstack",
		summary: "Ut enim ad minim veniam quis nostrud exercitation ullamco.",
		impact: "Aumentou a retenção de usuários em 25%.",
		tech: ["Next.js", "Prisma", "Redis"],
		visible: true,
	},
	"3": {
		title: "Projeto C",
		slug: "projeto-c",
		category: "frontend",
		summary: "Duis aute irure dolor in reprehenderit in voluptate velit.",
		impact: "Melhorou o tempo de carregamento em 60%.",
		tech: ["React", "Tailwind CSS", "Vite"],
		visible: false,
	},
	"4": {
		title: "Projeto D",
		slug: "projeto-d",
		category: "backend",
		summary: "Excepteur sint occaecat cupidatat non proident sunt in culpa.",
		impact: "Processou mais de 1 milhão de requisições por dia.",
		tech: ["Python", "FastAPI", "PostgreSQL"],
		visible: true,
	},
};

export const EditProject: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const initial = id ? mock[id] : undefined;

	const editor = useCreateBlockNote();

	const [form, setForm] = useState<FormState>(
		initial ?? {
			title: "",
			slug: "",
			category: "",
			summary: "",
			impact: "",
			tech: [],
			visible: true,
		},
	);
	const [techInput, setTechInput] = useState("");

	if (!initial) {
		return (
			<main className="space-y-8">
				<SectionTitle as="h1">Edit project</SectionTitle>
				<p className="text-sm text-muted-foreground">Project not found.</p>
			</main>
		);
	}

	function addTech() {
		const value = techInput.trim();
		if (!value || form.tech.includes(value)) return;
		setForm((p) => ({ ...p, tech: [...p.tech, value] }));
		setTechInput("");
	}

	function removeTech(item: string) {
		setForm((p) => ({ ...p, tech: p.tech.filter((t) => t !== item) }));
	}

	function handleTechKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addTech();
		}
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		console.log({ id, ...form, content: editor.document });
	}

	return (
		<main className="space-y-8">
			<SectionTitle as="h1">Edit project</SectionTitle>

			<form onSubmit={handleSubmit} className="space-y-8">
				{/* Title & Slug */}
				<FieldGroup className="gap-4">
					<Field>
						<FieldLabel htmlFor="title">Title</FieldLabel>
						<Input
							id="title"
							value={form.title}
							onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
							placeholder="My Project"
							className="px-2"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="slug">Slug</FieldLabel>
						<Input
							id="slug"
							value={form.slug}
							readOnly
							className="px-2 cursor-default text-muted-foreground"
						/>
					</Field>
				</FieldGroup>

				{/* Category */}
				<Field>
					<FieldLabel htmlFor="category">Category</FieldLabel>
					<Select
						value={form.category}
						onValueChange={(v) =>
							setForm((p) => ({
								...p,
								category: v as FormState["category"],
							}))
						}
					>
						<SelectTrigger id="category" className="w-full">
							<SelectValue placeholder="Select..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="fullstack">Full Stack</SelectItem>
							<SelectItem value="frontend">Frontend</SelectItem>
							<SelectItem value="backend">Backend</SelectItem>
						</SelectContent>
					</Select>
				</Field>

				{/* Summary & Impact */}
				<section className="space-y-4">
					<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						Listing
					</p>
					<FieldGroup className="gap-4">
						<Field>
							<FieldLabel htmlFor="summary">Summary</FieldLabel>
							<Textarea
								id="summary"
								value={form.summary}
								onChange={(e) =>
									setForm((p) => ({ ...p, summary: e.target.value }))
								}
								placeholder="Short description shown on the projects list..."
								className="px-2"
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="impact">Impact</FieldLabel>
							<Input
								id="impact"
								value={form.impact}
								onChange={(e) =>
									setForm((p) => ({ ...p, impact: e.target.value }))
								}
								placeholder="Reduced processing time by 40%."
								className="px-2"
							/>
						</Field>
					</FieldGroup>
				</section>

				{/* Tech stack */}
				<section className="space-y-4">
					<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						Tech stack
					</p>
					<Field>
						<FieldLabel htmlFor="tech">
							Add technology{" "}
							<span className="font-normal text-muted-foreground">
								(Enter or comma to confirm)
							</span>
						</FieldLabel>
						<Input
							id="tech"
							value={techInput}
							onChange={(e) => setTechInput(e.target.value)}
							onKeyDown={handleTechKeyDown}
							onBlur={addTech}
							placeholder="React, TypeScript..."
							className="px-2"
						/>
					</Field>
					{form.tech.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{form.tech.map((item) => (
								<span
									key={item}
									className="flex items-center gap-1 rounded border border-border px-2 py-0.5 text-xs text-muted-foreground"
								>
									{item}
									<button
										type="button"
										onClick={() => removeTech(item)}
										className="text-muted-foreground hover:text-foreground"
										aria-label={`Remove ${item}`}
									>
										<X className="size-3" />
									</button>
								</span>
							))}
						</div>
					)}
				</section>

				{/* Content */}
				<section className="space-y-4">
					<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						Content
					</p>
					<BlockNoteView editor={editor} />
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
						<Link to="/~/admin/projects">Cancel</Link>
					</Button>
					<Button type="submit">Save changes</Button>
				</div>
			</form>
		</main>
	);
};

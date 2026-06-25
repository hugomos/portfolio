import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { GripVertical, Plus, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { arrayMove, List } from "react-movable";
import { Link, useNavigate } from "react-router";
import { categoryLabels, statusLabels } from "@/modules/portfolio/project/dto";
import { useUpdateProject } from "@/modules/portfolio/project/hooks/use-update-project";
import { Button } from "@/presentation/components/ui/button";
import {
	Field,
	FieldError,
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
import { Spinner } from "@/presentation/components/ui/spinner";
import { Switch } from "@/presentation/components/ui/switch";
import { Textarea } from "@/presentation/components/ui/textarea";
import type { EditProjectFormSchema } from "./schema";

interface EditProjectFormProps {
	slug: string;
	initialContent?: string;
}

export const EditProjectForm: React.FC<EditProjectFormProps> = ({
	slug,
	initialContent,
}) => {
	const {
		register,
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useFormContext<EditProjectFormSchema>();

	const {
		fields: highlights,
		append,
		remove,
		replace,
	} = useFieldArray({
		control,
		name: "highlights",
	});

	const editor = useCreateBlockNote();

	useEffect(() => {
		if (!initialContent) return;
		const blocks = editor.tryParseMarkdownToBlocks(initialContent);
		editor.replaceBlocks(editor.document, blocks);
	}, [editor, initialContent]);

	const [techInput, setTechInput] = useState("");
	const techValues = watch("tech");

	const navigate = useNavigate();
	const { handleUpdateProject, updateProjectIsPending } = useUpdateProject({
		navigate,
	});

	const onSubmit = handleSubmit(async (data: EditProjectFormSchema) => {
		await handleUpdateProject({ ...data, slug });
		console.log({ ...data, slug });
	});

	function addTech() {
		const value = techInput.trim();
		if (!value || techValues?.includes(value)) return;
		setValue("tech", [...(techValues ?? []), value]);
		setTechInput("");
	}

	function removeTech(item: string) {
		setValue("tech", techValues?.filter((t) => t !== item) ?? []);
	}

	function handleTechKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addTech();
		}
	}

	return (
		<form onSubmit={onSubmit} className="space-y-8">
			{/* Title & Slug */}
			<FieldGroup className="gap-4">
				<Field>
					<FieldLabel htmlFor="title">Title</FieldLabel>
					<Input
						{...register("title")}
						placeholder="My Project"
						className="px-2"
					/>
					{errors.title && <FieldError>{errors.title.message}</FieldError>}
				</Field>
				<Field>
					<FieldLabel htmlFor="slug">Slug</FieldLabel>
					<Input
						value={slug}
						readOnly
						placeholder="my-project"
						className="cursor-default px-2 text-muted-foreground"
					/>
				</Field>
			</FieldGroup>

			{/* Category & Status */}
			<FieldGroup className="gap-4">
				<Field>
					<FieldLabel htmlFor="category">Category</FieldLabel>
					<Controller
						control={control}
						name="category"
						render={({ field }) => (
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger id="category" className="w-full">
									<SelectValue placeholder="Select..." />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(categoryLabels).map(([key, label]) => (
										<SelectItem key={key} value={key}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
					{errors.category && (
						<FieldError>{errors.category.message}</FieldError>
					)}
				</Field>
				<Field>
					<FieldLabel htmlFor="status">Status</FieldLabel>
					<Controller
						control={control}
						name="status"
						render={({ field }) => (
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger id="status" className="w-full">
									<SelectValue placeholder="Select..." />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(statusLabels).map(([key, label]) => (
										<SelectItem key={key} value={key}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
					{errors.status && <FieldError>{errors.status.message}</FieldError>}
				</Field>
			</FieldGroup>

			{/* Listing */}
			<section className="space-y-4">
				<p className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
					Listing
				</p>
				<FieldGroup className="gap-4">
					<Field>
						<FieldLabel htmlFor="summary">Summary</FieldLabel>
						<Textarea
							{...register("summary")}
							placeholder="Short description shown on the projects list..."
							className="px-2"
						/>
						{errors.summary && (
							<FieldError>{errors.summary.message}</FieldError>
						)}
					</Field>
					<Field>
						<FieldLabel htmlFor="impact">
							Impact{" "}
							<span className="font-normal text-muted-foreground">
								(optional)
							</span>
						</FieldLabel>
						<Input
							{...register("impact")}
							placeholder="Reduced processing time by 40%."
							className="px-2"
						/>
					</Field>
				</FieldGroup>
			</section>

			{/* Links */}
			<section className="space-y-4">
				<p className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
					Links
				</p>
				<FieldGroup className="gap-4">
					<Field>
						<FieldLabel htmlFor="repositoryUrl">
							Repository{" "}
							<span className="font-normal text-muted-foreground">
								(optional)
							</span>
						</FieldLabel>
						<Input
							{...register("repositoryUrl")}
							type="url"
							placeholder="https://github.com/..."
							className="px-2"
						/>
						{errors.repositoryUrl && (
							<FieldError>{errors.repositoryUrl.message}</FieldError>
						)}
					</Field>
					<Field>
						<FieldLabel htmlFor="liveUrl">
							Live URL{" "}
							<span className="font-normal text-muted-foreground">
								(optional)
							</span>
						</FieldLabel>
						<Input
							{...register("liveUrl")}
							type="url"
							placeholder="https://..."
							className="px-2"
						/>
						{errors.liveUrl && (
							<FieldError>{errors.liveUrl.message}</FieldError>
						)}
					</Field>
				</FieldGroup>
			</section>

			{/* Tech stack */}
			<section className="space-y-4">
				<p className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
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
				{techValues && techValues.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{techValues.map((item) => (
							<span
								key={item}
								className="flex items-center gap-1 rounded border border-border px-2 py-0.5 text-muted-foreground text-xs"
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

			{/* Highlights */}
			<section className="space-y-4">
				<p className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
					Highlights
				</p>

				{highlights.length > 0 && (
					<ScrollArea className="max-h-80">
						<List
							values={highlights}
							onChange={({ oldIndex, newIndex }) =>
								replace(
									arrayMove(highlights, oldIndex, newIndex).map((item, i) => ({
										...item,
										sortOrder: i + 1,
									})),
								)
							}
							renderList={({ children, props }) => (
								<div className="space-y-3 pr-2" {...props}>
									{children}
								</div>
							)}
							renderItem={({ value, props, isDragged }) => {
								const index = highlights.findIndex((f) => f.id === value.id);
								return (
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
										<Controller
											control={control}
											name={`highlights.${index}.content`}
											render={({ field, fieldState }) => (
												<div className="flex flex-1 flex-col gap-1">
													<Textarea
														{...field}
														placeholder="Describe an achievement or responsibility..."
														className="px-2"
													/>
													{fieldState.error && (
														<FieldError>{fieldState.error.message}</FieldError>
													)}
												</div>
											)}
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="mt-1 text-muted-foreground hover:text-destructive"
											onClick={() => remove(index)}
										>
											<X />
											<span className="sr-only">Remove highlight</span>
										</Button>
									</div>
								);
							}}
						/>
					</ScrollArea>
				)}

				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() =>
						append({ content: "", sortOrder: highlights.length + 1 })
					}
				>
					<Plus data-icon="inline-start" />
					Add highlight
				</Button>
			</section>

			{/* Content */}
			<section className="space-y-4">
				<p className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
					Content
				</p>
				<Controller
					control={control}
					name="content"
					render={({ field }) => (
						<BlockNoteView
							editor={editor}
							onChange={() => {
								field.onChange(editor.blocksToMarkdownLossy());
							}}
						/>
					)}
				/>
			</section>

			{/* Visible */}
			<Field orientation="horizontal">
				<FieldLabel htmlFor="visible">Visible on portfolio</FieldLabel>
				<Controller
					control={control}
					name="visible"
					render={({ field }) => (
						<Switch
							id="visible"
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
					)}
				/>
			</Field>

			{/* Actions */}
			<div className="flex justify-end gap-3 pt-2">
				<Button
					type="button"
					variant="outline"
					asChild
					disabled={updateProjectIsPending}
				>
					<Link to="/~/admin/projects">Cancel</Link>
				</Button>
				<Button type="submit" disabled={updateProjectIsPending}>
					{updateProjectIsPending ? <Spinner /> : "Save changes"}
				</Button>
			</div>
		</form>
	);
};

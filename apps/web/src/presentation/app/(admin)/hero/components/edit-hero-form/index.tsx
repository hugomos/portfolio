import { GripVertical, Plus, X } from "lucide-react";
import type React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { arrayMove, List } from "react-movable";
import { useReplaceSkills } from "@/modules/portfolio/hero/hooks/use-replace-skills";
import { useUpdateHero } from "@/modules/portfolio/hero/hooks/use-update-hero";
import { Button } from "@/presentation/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/presentation/components/ui/field";
import { Input } from "@/presentation/components/ui/input";
import { ScrollArea } from "@/presentation/components/ui/scroll-area";
import { Spinner } from "@/presentation/components/ui/spinner";
import { Textarea } from "@/presentation/components/ui/textarea";
import type { EditHeroFormSchema } from "./schema";

export const EditHeroForm: React.FC = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useFormContext<EditHeroFormSchema>();

	const {
		fields: skills,
		append,
		remove,
		replace,
	} = useFieldArray({
		control,
		name: "skills",
	});

	const { handleUpdateHero, updateHeroIsPending } = useUpdateHero();
	const { handleReplaceSkills, replaceSkillsIsPending } = useReplaceSkills();

	const onSubmit = handleSubmit(async ({ name, title, bio, skills, links }: EditHeroFormSchema) => {
		await Promise.all([
			handleUpdateHero({ name, title, bio, ...links }),
			handleReplaceSkills({ skills }),
		]);
	});

	return (
		<form onSubmit={onSubmit} className="space-y-8">
			{/* Identity */}
			<section className="space-y-4">
				<p className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
					Identity
				</p>
				<FieldGroup className="gap-4">
					<Field>
						<FieldLabel htmlFor="name">Name</FieldLabel>
						<Input
							{...register("name")}
							placeholder="Your name"
							className="px-2"
						/>
						{errors.name && <FieldError>{errors.name.message}</FieldError>}
					</Field>
					<Field>
						<FieldLabel htmlFor="title">Title</FieldLabel>
						<Input
							{...register("title")}
							placeholder="Software Engineer"
							className="px-2"
						/>
						{errors.title && <FieldError>{errors.title.message}</FieldError>}
					</Field>
				</FieldGroup>
				<Field>
					<FieldLabel htmlFor="bio">Bio</FieldLabel>
					<Textarea
						{...register("bio")}
						placeholder="A short description about yourself..."
						className="px-2"
					/>
					{errors.bio && <FieldError>{errors.bio.message}</FieldError>}
				</Field>
			</section>

			{/* Skills */}
			<section className="space-y-4">
				<p className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
					Skills
				</p>

				{skills.length > 0 && (
					<ScrollArea className="max-h-80">
						<List
							values={skills}
							onChange={({ oldIndex, newIndex }) =>
								replace(
									arrayMove(skills, oldIndex, newIndex).map((item, i) => ({
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
								const index = skills.findIndex((f) => f.id === value.id);
								return (
									<div
										{...props}
										key={value.id}
										className={`flex items-center gap-2 ${isDragged ? "opacity-50" : ""}`}
									>
										<button
											data-movable-handle
											type="button"
											aria-label="Drag to reorder"
											className="cursor-grab text-muted-foreground hover:text-foreground"
										>
											<GripVertical className="size-4" />
										</button>
										<Controller
											control={control}
											name={`skills.${index}.name`}
											render={({ field, fieldState }) => (
												<div className="flex flex-1 flex-col gap-1">
													<Input
														{...field}
														placeholder="TypeScript"
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
											className="text-muted-foreground hover:text-destructive"
											onClick={() => remove(index)}
										>
											<X />
											<span className="sr-only">Remove skill</span>
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
					onClick={() => append({ name: "", sortOrder: skills.length + 1 })}
				>
					<Plus data-icon="inline-start" />
					Add skill
				</Button>
			</section>

			{/* Links */}
			<section className="space-y-4">
				<p className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
					Links
				</p>
				<FieldGroup className="gap-4">
					<Field>
						<FieldLabel htmlFor="links.resumeUrl">
							Resume{" "}
							<span className="font-normal text-muted-foreground">
								(optional)
							</span>
						</FieldLabel>
						<Input
							{...register("links.resumeUrl")}
							type="url"
							placeholder="https://..."
							className="px-2"
						/>
						{errors.links?.resumeUrl && (
							<FieldError>{errors.links.resumeUrl.message}</FieldError>
						)}
					</Field>
					<Field>
						<FieldLabel htmlFor="links.githubUrl">
							GitHub{" "}
							<span className="font-normal text-muted-foreground">
								(optional)
							</span>
						</FieldLabel>
						<Input
							{...register("links.githubUrl")}
							type="url"
							placeholder="https://github.com/..."
							className="px-2"
						/>
						{errors.links?.githubUrl && (
							<FieldError>{errors.links.githubUrl.message}</FieldError>
						)}
					</Field>
					<Field>
						<FieldLabel htmlFor="links.linkedinUrl">
							LinkedIn{" "}
							<span className="font-normal text-muted-foreground">
								(optional)
							</span>
						</FieldLabel>
						<Input
							{...register("links.linkedinUrl")}
							type="url"
							placeholder="https://linkedin.com/in/..."
							className="px-2"
						/>
						{errors.links?.linkedinUrl && (
							<FieldError>{errors.links.linkedinUrl.message}</FieldError>
						)}
					</Field>
				</FieldGroup>
			</section>

			{/* Actions */}
			<div className="flex justify-end pt-2">
				<Button type="submit" disabled={updateHeroIsPending || replaceSkillsIsPending}>
					{updateHeroIsPending ? <Spinner /> : "Save changes"}
				</Button>
			</div>
		</form>
	);
};

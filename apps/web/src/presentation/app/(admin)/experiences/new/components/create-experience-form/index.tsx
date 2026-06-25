import { GripVertical, Plus, X } from "lucide-react";
import type React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { arrayMove, List } from "react-movable";
import { Link, useNavigate } from "react-router";
import { workModeLabel } from "@/modules/portfolio/experience/dto";
import { useCreateExperience } from "@/modules/portfolio/experience/hooks/use-create-experience";
import { Button } from "@/presentation/components/ui/button";
import { DatePicker } from "@/presentation/components/ui/date-picker";
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
import type { CreateExperienceFormSchema } from "./schema";

export const CreateExperienceForm: React.FC = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useFormContext<CreateExperienceFormSchema>();

	const {
		fields: highlights,
		append,
		remove,
		replace,
	} = useFieldArray({
		control,
		name: "highlights",
	});

	const navigate = useNavigate();
	const { handleCreateExperience, createExperienceIsPending } =
		useCreateExperience({ navigate });

	const onSubmit = handleSubmit(async (data: CreateExperienceFormSchema) => {
		await handleCreateExperience(data);
	});

	return (
		<form onSubmit={onSubmit} className="space-y-8">
			{/* Company */}
			<section className="space-y-4">
				<p className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
					Company
				</p>
				<FieldGroup className="gap-4">
					<Field>
						<FieldLabel htmlFor="companyName">Name</FieldLabel>
						<Input
							{...register("companyName")}
							placeholder="Acme Corp"
							className="px-2"
						/>
						{errors.companyName && (
							<FieldError>{errors.companyName.message}</FieldError>
						)}
					</Field>
					<Field>
						<FieldLabel htmlFor="companyWebsite">
							Website{" "}
							<span className="font-normal text-muted-foreground">
								(optional)
							</span>
						</FieldLabel>
						<Input
							{...register("companyWebsite")}
							type="url"
							placeholder="https://acme.com"
							className="px-2"
						/>
						{errors.companyWebsite && (
							<FieldError>{errors.companyWebsite.message}</FieldError>
						)}
					</Field>
				</FieldGroup>
			</section>

			{/* Role & Work mode */}
			<FieldGroup className="gap-4">
				<Field>
					<FieldLabel htmlFor="role">Role</FieldLabel>
					<Input
						{...register("role")}
						placeholder="Software Engineer"
						className="px-2"
					/>
					{errors.role && <FieldError>{errors.role.message}</FieldError>}
				</Field>
				<Field>
					<FieldLabel htmlFor="workMode">Work mode</FieldLabel>
					<Controller
						control={control}
						name="workMode"
						render={({ field }) => (
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger id="workMode" className="w-full">
									<SelectValue placeholder="Select..." />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(workModeLabel).map(([key, label]) => (
										<SelectItem key={key} value={key}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
					{errors.workMode && (
						<FieldError>{errors.workMode.message}</FieldError>
					)}
				</Field>
			</FieldGroup>

			{/* Dates */}
			<section className="space-y-4">
				<p className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
					Period
				</p>
				<div className="grid gap-4 sm:grid-cols-2">
					<Field>
						<FieldLabel>Start date</FieldLabel>
						<Controller
							control={control}
							name="startDate"
							render={({ field }) => (
								<DatePicker value={field.value} onChange={field.onChange} />
							)}
						/>
						{errors.startDate && (
							<FieldError>{errors.startDate.message}</FieldError>
						)}
					</Field>
					<Field>
						<FieldLabel>
							End date{" "}
							<span className="font-normal text-muted-foreground">
								(leave empty for present)
							</span>
						</FieldLabel>
						<Controller
							control={control}
							name="endDate"
							render={({ field }) => (
								<DatePicker
									value={field.value}
									onChange={field.onChange}
									placeholder="Present"
								/>
							)}
						/>
						{errors.endDate && (
							<FieldError>{errors.endDate.message}</FieldError>
						)}
						{errors.root && <FieldError>{errors.root.message}</FieldError>}
					</Field>
				</div>
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
					disabled={createExperienceIsPending}
				>
					<Link to="/~/admin/experiences">Cancel</Link>
				</Button>
				<Button type="submit" disabled={createExperienceIsPending}>
					{createExperienceIsPending ? <Spinner /> : "Create experience"}
				</Button>
			</div>
		</form>
	);
};

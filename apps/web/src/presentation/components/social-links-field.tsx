"use client";

import { GripVertical, Plus, X } from "lucide-react";
import type React from "react";
import {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type Control,
	Controller,
	useFieldArray,
} from "react-hook-form";
import { arrayMove, List } from "react-movable";
import {
	type SocialPlatform,
	socialPlatformKeys,
	socialPlatformLabels,
} from "@/modules/portfolio/project/dto";
import { Button } from "./ui/button";
import { FieldError } from "./ui/field";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

type SocialLinkFormValue = {
	platform: SocialPlatform;
	username: string;
	sortOrder: number;
};

interface SocialLinksFieldProps {
	// biome-ignore lint/suspicious/noExplicitAny: componente reutilizável aceita qualquer form — type-safety vem do schema do form pai
	control: Control<any>;
	name: string;
}

export const SocialLinksField: React.FC<SocialLinksFieldProps> = ({
	control,
	name,
}) => {
	const { fields, append, remove, replace } = useFieldArray({
		control,
		name,
	});

	const items = fields as Array<SocialLinkFormValue & { id: string }>;

	function handleUsernameBlur(
		value: string,
		onChange: (v: string) => void,
	) {
		onChange(value.replace(/^@/, "").trim());
	}

	return (
		<div className="space-y-3">
			{items.length > 0 && (
				<List
					values={items}
					onChange={({ oldIndex, newIndex }) =>
						replace(
							arrayMove(items, oldIndex, newIndex).map((item, i) => ({
								...item,
								sortOrder: i + 1,
							})),
						)
					}
					renderList={({ children, props }) => (
						<div className="space-y-3" {...props}>
							{children}
						</div>
					)}
					renderItem={({ value, props, isDragged }) => {
						const index = items.findIndex((f) => f.id === value.id);
						return (
							<div
								{...props}
								key={value.id}
								className={`flex items-start gap-2 ${isDragged ? "opacity-50" : ""}`}
							>
								<button
									data-movable-handle
									type="button"
									aria-label="Reordenar"
									className="mt-2 cursor-grab text-muted-foreground hover:text-foreground"
								>
									<GripVertical className="size-4" />
								</button>

								<Controller
									control={control}
									name={`${name}.${index}.platform`}
									render={({ field }) => (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className="w-40">
												<SelectValue placeholder="Plataforma" />
											</SelectTrigger>
											<SelectContent>
												{socialPlatformKeys.map((p) => (
													<SelectItem key={p} value={p}>
														{socialPlatformLabels[p]}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>

								<Controller
									control={control}
									name={`${name}.${index}.username`}
									render={({ field, fieldState }) => (
										<div className="flex flex-1 flex-col gap-1">
											<Input
												{...field}
												placeholder="username (sem @)"
												className="px-2"
												onBlur={(e) =>
													handleUsernameBlur(e.target.value, field.onChange)
												}
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
									className="mt-0.5 text-muted-foreground hover:text-destructive"
									onClick={() => remove(index)}
								>
									<X />
									<span className="sr-only">Remover</span>
								</Button>
							</div>
						);
					}}
				/>
			)}

			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={() =>
					append({ platform: "instagram", username: "", sortOrder: items.length + 1 })
				}
			>
				<Plus data-icon="inline-start" />
				Adicionar rede social
			</Button>
		</div>
	);
};

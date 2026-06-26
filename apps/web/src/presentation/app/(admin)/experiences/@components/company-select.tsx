import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCompanies } from "@/modules/portfolio/experience/hooks/use-companies";
import { useCreateCompany } from "@/modules/portfolio/experience/hooks/use-create-company";
import { Button } from "@/presentation/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/presentation/components/ui/dialog";
import {
	Field,
	FieldError,
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
import { Spinner } from "@/presentation/components/ui/spinner";

const newCompanySchema = z.object({
	name: z.string().min(1, "Name is required"),
	website: z.preprocess(
		(val) => (val === "" ? undefined : val),
		z.url().optional(),
	),
});

type NewCompanySchema = z.infer<typeof newCompanySchema>;

interface CompanySelectProps {
	value: string;
	onChange: (id: string) => void;
	error?: string;
}

export const CompanySelect: React.FC<CompanySelectProps> = ({
	value,
	onChange,
	error,
}) => {
	const { companies, companiesIsLoading } = useCompanies();
	const { handleCreateCompany, createCompanyIsPending } = useCreateCompany();
	const [open, setOpen] = useState(false);

	const form = useForm<NewCompanySchema>({
		resolver: standardSchemaResolver(newCompanySchema),
		defaultValues: { name: "", website: "" },
	});

	async function onSubmit(data: NewCompanySchema) {
		const { id } = await handleCreateCompany(data);
		onChange(id);
		setOpen(false);
		form.reset();
	}

	return (
		<div className="flex gap-2">
			<Select
				value={value}
				onValueChange={onChange}
				disabled={companiesIsLoading}
			>
				<SelectTrigger className="flex-1">
					<SelectValue
						placeholder={companiesIsLoading ? "Loading..." : "Select a company"}
					/>
				</SelectTrigger>
				<SelectContent>
					{companies?.map((c) => (
						<SelectItem key={c.id} value={c.id}>
							{c.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Button
				type="button"
				variant="outline"
				size="icon"
				onClick={() => setOpen(true)}
			>
				<Plus className="size-4" />
				<span className="sr-only">New company</span>
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>New company</DialogTitle>
					</DialogHeader>

					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<Field>
							<FieldLabel htmlFor="name">Name</FieldLabel>
							<Input
								{...form.register("name")}
								id="name"
								placeholder="Acme Corp"
								className="px-2"
							/>
							{form.formState.errors.name && (
								<FieldError>{form.formState.errors.name.message}</FieldError>
							)}
						</Field>

						<Field>
							<FieldLabel htmlFor="website">
								Website{" "}
								<span className="font-normal text-muted-foreground">
									(optional)
								</span>
							</FieldLabel>
							<Input
								{...form.register("website")}
								id="website"
								type="url"
								placeholder="https://acme.com"
								className="px-2"
							/>
							{form.formState.errors.website && (
								<FieldError>{form.formState.errors.website.message}</FieldError>
							)}
						</Field>

						<DialogFooter showCloseButton>
							<Button type="submit" disabled={createCompanyIsPending}>
								{createCompanyIsPending ? <Spinner /> : "Create"}
							</Button>
						</DialogFooter>
					</form>

					{error && <FieldError>{error}</FieldError>}
				</DialogContent>
			</Dialog>
		</div>
	);
};

import type React from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSignIn } from "@/modules/identity/authentication/hooks/use-sign-in";
import { Button } from "@/presentation/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/presentation/components/ui/field";
import { Input } from "@/presentation/components/ui/input";
import { Spinner } from "@/presentation/components/ui/spinner";
import type { SignInFormSchema } from "./schema";

export const SignInForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext<SignInFormSchema>();

	const navigate = useNavigate();
	const { handleSignIn, signInIsPending } = useSignIn({ navigate });

	return (
		<form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-10">
			<FieldGroup className="gap-4">
				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input
						{...register("email")}
						id="email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						className="px-2"
					/>
					{errors.email && <FieldError>{errors.email.message}</FieldError>}
				</Field>

				<Field>
					<FieldLabel htmlFor="password">Password</FieldLabel>
					<Input
						{...register("password")}
						id="password"
						type="password"
						placeholder="••••••••"
						autoComplete="current-password"
						className="px-2"
					/>
					{errors.password && <FieldError>{errors.password.message}</FieldError>}
				</Field>
			</FieldGroup>

			<Button type="submit" className="w-full" disabled={signInIsPending}>
				{signInIsPending ? <Spinner /> : "Sign in"}
			</Button>
		</form>
	);
};

import type React from "react";
import { Button } from "@/presentation/components/ui/button";
import {
	Field,
	FieldGroup,
	FieldLabel,
} from "@/presentation/components/ui/field";
import { Input } from "@/presentation/components/ui/input";
import { SectionTitle } from "@/presentation/app/(public)/@components/section-title";

export const SignIn: React.FC = () => {
	return (
		<main className="flex min-h-screen items-center justify-center px-4">
			<form className="flex w-full max-w-xs flex-col gap-10">
				<SectionTitle as="h1">sign in</SectionTitle>

				<FieldGroup className="gap-4">
					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							autoComplete="email"
							className="px-2"
						/>
					</Field>

					<Field>
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							autoComplete="current-password"
							className="px-2"
						/>
					</Field>
				</FieldGroup>

				<Button type="submit" className="w-full">
					Sign in
				</Button>
			</form>
		</main>
	);
};

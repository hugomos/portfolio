import type React from "react";
import { FormProvider } from "react-hook-form";
import { SectionTitle } from "@/presentation/components/section-title";
import { SignInForm } from "./components/sign-in-form";
import { useSignInForm } from "./components/sign-in-form/use-sign-in-form";

export const SignIn: React.FC = () => {
	const form = useSignInForm();

	return (
		<main className="flex min-h-screen items-center justify-center px-4">
			<div className="flex w-full max-w-xs flex-col gap-10">
				<SectionTitle as="h1">sign in</SectionTitle>
				<FormProvider {...form}>
					<SignInForm />
				</FormProvider>
			</div>
		</main>
	);
};

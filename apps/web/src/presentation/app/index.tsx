import { QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { queryClient } from "@/infra/http/query-client";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "../components/ui/sonner";
import { AuthGuard } from "./(admin)/@components/auth-guard";
import { AdminRootLayout } from "./(admin)/_layout";
import { Experiences } from "./(admin)/experiences";
import { EditExperience } from "./(admin)/experiences/$id";
import { NewExperience } from "./(admin)/experiences/new";
import { EditHero } from "./(admin)/hero";
import { Projects } from "./(admin)/projects";
import { EditProject } from "./(admin)/projects/$id";
import { NewProject } from "./(admin)/projects/new";
import { Index } from "./(public)";
import { ProjectDetail } from "./(public)/@sections/projects/$slug";
import { PublicRootLayout } from "./(public)/_layout";
import { RedirectIfAuthenticated } from "./(public)/auth/@components/redirect-if-authenticated";
import { SignIn } from "./(public)/auth/sign-in";

export const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster richColors />
			<ThemeProvider defaultTheme="dark" storageKey="hugomos-ui-theme">
				<BrowserRouter>
					<Routes>
						<Route element={<PublicRootLayout />}>
							<Route path="/" element={<Index />} />
							<Route path="/projects/:slug" element={<ProjectDetail />} />
						</Route>

						<Route element={<RedirectIfAuthenticated />}>
							<Route path="/auth/sign-in" element={<SignIn />} />
						</Route>

						<Route path="/~/admin">
							<Route element={<AuthGuard />}>
								<Route element={<AdminRootLayout />}>
									<Route index element={<Navigate to="projects" replace />} />
									<Route path="projects">
										<Route index element={<Projects />} />
										<Route path="new" element={<NewProject />} />
										<Route path=":id" element={<EditProject />} />
									</Route>
									<Route path="experiences">
										<Route index element={<Experiences />} />
										<Route path="new" element={<NewExperience />} />
										<Route path=":id" element={<EditExperience />} />
									</Route>
									<Route path="hero" element={<EditHero />} />
								</Route>
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

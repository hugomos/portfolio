import type React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ThemeProvider } from "../components/theme-provider";
import { AuthGuard } from "./(admin)/@components/auth-guard";
import { AdminRootLayout } from "./(admin)/_layout";
import { Experiences } from "./(admin)/experiences";
import { EditExperience } from "./(admin)/experiences/$id";
import { NewExperience } from "./(admin)/experiences/new";
import { Index } from "./(public)";
import { PublicRootLayout } from "./(public)/_layout";
import { RedirectIfAuthenticated } from "./(public)/auth/@components/redirect-if-authenticated";
import { SignIn } from "./(public)/auth/sign-in";
import { ProjectDetail } from "./(public)/projects/$slug";
import { Projects } from "./(admin)/projects";

export const App: React.FC = () => {
	return (
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
								<Route path="projects" element={<Projects />} />
								<Route path="experiences">
									<Route index element={<Experiences />} />
									<Route path="new" element={<NewExperience />} />
									<Route path=":id" element={<EditExperience />} />
								</Route>
							</Route>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

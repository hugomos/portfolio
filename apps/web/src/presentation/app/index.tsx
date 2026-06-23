import type React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "../components/theme-provider";
import { Admin } from "./(admin)";
import { AuthGuard } from "./(admin)/@components/auth-guard";
import { Index } from "./(public)";
import { PublicRootLayout } from "./(public)/_layout";
import { RedirectIfAuthenticated } from "./(public)/auth/@components/redirect-if-authenticated";
import { SignIn } from "./(public)/auth/sign-in";
import { ProjectDetail } from "./(public)/projects/$slug";

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

					<Route element={<AuthGuard />}>
						<Route path="/~/admin" element={<Admin />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

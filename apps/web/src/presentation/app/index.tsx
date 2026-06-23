import type React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "../components/theme-provider";
import { Index } from "./(public)";
import { PublicRootLayout } from "./(public)/_layout";
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
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

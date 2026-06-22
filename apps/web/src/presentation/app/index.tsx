import type React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "../components/theme-provider";
import { PublicRootLayout } from "./(public)/_layout";
import { Home } from "./(public)/home";

export const App: React.FC = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="hugomos-ui-theme">
			<BrowserRouter>
				<Routes>
					<Route element={<PublicRootLayout />}>
						<Route path="/" element={<Home />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

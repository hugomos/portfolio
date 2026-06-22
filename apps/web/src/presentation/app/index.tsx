import type React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "../components/theme-provider";
import { Home } from "./home";

export const App: React.FC = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="hugomos-ui-theme">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

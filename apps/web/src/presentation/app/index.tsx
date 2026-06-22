import type React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./home";

export const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};

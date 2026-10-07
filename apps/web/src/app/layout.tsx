import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/presentation/components/theme-provider";
import { Toaster } from "@/presentation/components/ui/sonner";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
	title: "Vitor Hugo | Portfolio",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>
					<ThemeProvider defaultTheme="dark" storageKey="hugomos-ui-theme">
						<Toaster richColors />
						{children}
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	);
}

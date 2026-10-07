import { AuthGuard } from "@/presentation/app/(admin)/@components/auth-guard";
import { Header } from "@/presentation/app/(admin)/@components/header";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AuthGuard>
			<div className="flex min-h-screen flex-col">
				<Header />
				<div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10 md:px-8">
					{children}
				</div>
			</div>
		</AuthGuard>
	);
}

import { RedirectIfAuthenticated } from "@/presentation/app/(public)/auth/@components/redirect-if-authenticated";
import { SignIn } from "@/presentation/app/(public)/auth/sign-in";

export default function SignInPage() {
	return (
		<RedirectIfAuthenticated>
			<SignIn />
		</RedirectIfAuthenticated>
	);
}

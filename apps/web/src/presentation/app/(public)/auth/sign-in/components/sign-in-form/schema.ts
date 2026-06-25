import { z } from "zod";

export const signInFormSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(1, "Password is required"),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;

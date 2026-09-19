import type { Metadata } from "next";
import { AuthScreen } from "@/components/auth/AuthScreen";

export const metadata: Metadata = { title: "Create Account | Keazzy's Curations" };
export default function SignupPage() { return <AuthScreen mode="signup" />; }


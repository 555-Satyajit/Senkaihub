import { Suspense } from "react";
import { Metadata } from "next";
import { LoginContainer } from "@/features/auth/containers/LoginContainer";

export const metadata: Metadata = {
  title: "Login & Onboarding — SenkaiHub",
  description: "Sign in to SenkaiHub with Google or Email and customize your clan profile.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginContainer />
    </Suspense>
  );
}

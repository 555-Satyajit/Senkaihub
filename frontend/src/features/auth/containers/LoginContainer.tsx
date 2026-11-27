"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LoginFormCard, OnboardingFlow } from "@/features/auth";

export function LoginContainer() {
  const searchParams = useSearchParams();
  const initialStep = searchParams?.get("step") === "onboarding" ? "onboarding" : "login";
  const [step, setStep] = useState<"login" | "onboarding">(initialStep);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleNewUserDetected = (email: string) => {
    setUserEmail(email);
    setStep("onboarding");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Top Header */}
      <header className="w-full px-6 py-5 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/feed" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center shrink-0">
            <Image
              src="/mainlogo.png"
              alt="SenkaiHub Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-heading font-black tracking-wider text-lg uppercase text-foreground">
            Senkai<span className="text-primary">Hub</span>
          </span>
        </Link>

        {step === "onboarding" ? (
          <button
            type="button"
            onClick={() => setStep("login")}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border/80 hover:bg-secondary/60 cursor-pointer"
          >
            Back to Sign In
          </button>
        ) : (
          <Link
            href="/feed"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border/80 hover:bg-secondary/60"
          >
            Explore as Guest
          </Link>
        )}
      </header>

      {/* Main Container - Switches between Login and Onboarding */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        {step === "login" ? (
          <LoginFormCard onNewUserDetected={handleNewUserDetected} />
        ) : (
          <OnboardingFlow initialEmail={userEmail} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-5 border-t border-border/40 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SenkaiHub. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Support
          </Link>
        </div>
      </footer>
    </div>
  );
}

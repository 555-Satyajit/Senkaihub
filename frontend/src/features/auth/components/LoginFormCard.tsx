"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "./GoogleIcon";

interface LoginFormCardProps {
  onNewUserDetected?: (email: string) => void;
}

export function LoginFormCard({ onNewUserDetected }: LoginFormCardProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<"password" | "magic-link">("password");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setErrorMessage(null);
      await new Promise((resolve) => setTimeout(resolve, 600));
      // If parent supplied onboarding handler or new user, trigger onboarding
      if (onNewUserDetected) {
        onNewUserDetected("google_user@senkaihub.com");
      } else {
        router.push("/login?step=onboarding");
      }
    } catch {
      setErrorMessage("Failed to initialize Google Sign-In.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.push("/feed");
    } catch {
      setErrorMessage("Invalid credentials. Please verify and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await new Promise((resolve) => setTimeout(resolve, 700));
      setMagicLinkSent(true);
    } catch {
      setErrorMessage("Unable to send magic link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-[420px] rounded-[24px] bg-card border border-border/80 p-6 sm:p-8 shadow-2xl relative">
      <CardContent className="p-0 flex flex-col gap-5">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2.5">
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
            <span className="font-heading font-black tracking-wider text-xl uppercase text-foreground">
              Senkai<span className="text-primary">Hub</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Welcome back
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter your credentials to access your clan and vaults
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="p-3 text-xs rounded-xl bg-destructive/15 border border-destructive/30 text-destructive-foreground font-medium"
          >
            {errorMessage}
          </div>
        )}

        {/* 1. Google OAuth Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isLoading}
          className="w-full h-11 rounded-xl bg-secondary/40 hover:bg-secondary border-border/80 text-foreground font-medium text-sm transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm hover:border-border"
        >
          {isGoogleLoading ? (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <GoogleIcon size={18} />
          )}
          <span>Continue with Google</span>
        </Button>

        {/* Divider */}
        <div className="relative flex items-center justify-center py-1">
          <Separator className="w-full bg-border/60" />
          <span className="absolute bg-card px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            or continue with
          </span>
        </div>

        {/* Mode Selector Pill */}
        <div className="grid grid-cols-2 p-1 bg-muted/60 rounded-xl border border-border/60">
          <button
            type="button"
            onClick={() => {
              setAuthMode("password");
              setErrorMessage(null);
            }}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              authMode === "password"
                ? "bg-secondary text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("magic-link");
              setErrorMessage(null);
            }}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              authMode === "magic-link"
                ? "bg-secondary text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Magic Link
          </button>
        </div>

        {/* Password Form */}
        {authMode === "password" ? (
          <form onSubmit={handleEmailPasswordSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <Label htmlFor="login-email" className="text-xs font-medium text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 pl-10 rounded-xl bg-muted/50 border-border/80 text-foreground placeholder:text-muted-foreground/60 text-sm focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="text-xs font-medium text-foreground">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setAuthMode("magic-link")}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-10 pl-10 pr-10 rounded-xl bg-muted/50 border-border/80 text-foreground placeholder:text-muted-foreground/60 text-sm focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 rounded-xl text-primary-foreground font-semibold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer mt-1"
              style={{ background: "var(--gradient-btn)" }}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        ) : (
          /* Magic Link Form */
          <div>
            {magicLinkSent ? (
              <div className="py-5 px-3 text-center space-y-3 bg-muted/30 rounded-xl border border-border/60">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  Check your email
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We sent a sign-in link to <span className="text-foreground font-medium">{email}</span>. Click it to log in immediately.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMagicLinkSent(false)}
                  className="text-xs h-8 rounded-lg border-border/80 cursor-pointer"
                >
                  Use a different email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleMagicLinkSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <Label htmlFor="magic-email" className="text-xs font-medium text-foreground">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                      aria-hidden="true"
                    />
                    <Input
                      id="magic-email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-10 pl-10 rounded-xl bg-muted/50 border-border/80 text-foreground placeholder:text-muted-foreground/60 text-sm focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground pt-0.5">
                    We&apos;ll send a secure one-click link to your inbox.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 rounded-xl text-primary-foreground font-semibold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer mt-1"
                  style={{ background: "var(--gradient-btn)" }}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Send Magic Link</span>
                  )}
                </Button>
              </form>
            )}
          </div>
        )}

        {/* Footer info inside card */}
        <div className="text-center pt-2 border-t border-border/40 flex flex-col gap-2">
          <p className="text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setAuthMode("magic-link");
              }}
              className="text-primary font-medium hover:underline cursor-pointer"
            >
              Sign up
            </Link>
          </p>
          <p className="text-[11px] text-muted-foreground/70">
            By signing in, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-midnight p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate bg-navy/60 p-8 shadow-soft-lg backdrop-blur-xl">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center border border-gold/30">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
            Project Blueframe Admin
          </h1>
          <p className="text-xs text-muted-foreground">
            Sign in with your administrator credentials
          </p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-white uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="reshmamuraleedharantp@gmail.com"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-white uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••••••"
                className="pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full mt-2"
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </Button>
        </form>
      </div>
    </main>
  );
}

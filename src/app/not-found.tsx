import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Film } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "Looks like this page has moved behind the scenes.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center border border-gold/20">
          <Film className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">404</span>
          <h1 className="font-heading text-3xl font-bold text-white">
            Looks like this page has moved behind the scenes.
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The page you are looking for may have been relocated, renamed, or is still in production. Let&apos;s get you back on set.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
          <Button variant="primary" asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/work" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Browse the Portfolio</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

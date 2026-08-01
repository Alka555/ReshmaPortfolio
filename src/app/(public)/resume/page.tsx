import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Film, Feather, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume — Reshma Muraleedharan Tp",
  description: "View Reshma Muraleedharan Tp's creative resume, selected work, and background in cinematic storytelling.",
};

const highlights = [
  {
    title: "Commercial Direction",
    description: "Brand films, product stories, and short-form campaigns shaped around clarity and emotion.",
  },
  {
    title: "Writing & Narrative",
    description: "Script development, editorial storytelling, and voice-led content built for modern audiences.",
  },
  {
    title: "Visual Craft",
    description: "A calm, cinematic approach that blends atmosphere, pacing, and thoughtful composition.",
  },
];

const experience = [
  {
    title: "Independent Creative Director",
    period: "2024 — Present",
    description: "Leading brand storytelling projects across film, social content, and narrative-led commissions.",
  },
  {
    title: "Narrative & Short Film Development",
    period: "2021 — 2023",
    description: "Developed original concepts and short-form films focused on memory, identity, and human connection.",
  },
];

export default function ResumePage() {
  return (
    <div className="container max-w-5xl py-24">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_90px_-35px_rgba(3,10,24,0.9)] backdrop-blur-xl md:p-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Resume</p>
            <h1 className="font-heading text-4xl text-white sm:text-5xl">Reshma M</h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/70">
              Content creator, writer, and visual storyteller crafting calm, cinematic narratives for brands and audiences.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-gold transition-colors hover:bg-gold/20"
          >
            <span>Contact</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-midnight/70 p-6">
              <h2 className="font-heading text-lg text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Experience</h2>
              <div className="mt-5 space-y-5">
                {experience.map((item) => (
                  <div key={item.title} className="border-l border-white/10 pl-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-heading text-xl text-white">{item.title}</h3>
                      <span className="text-xs uppercase tracking-[0.24em] text-white/45">{item.period}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Selected Focus</h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/70">
                <li className="flex gap-3"><Film className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Branded cinematic films and social-first storytelling.</li>
                <li className="flex gap-3"><Feather className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Narrative-driven writing for campaigns and editorial content.</li>
                <li className="flex gap-3"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Emotion-led creative direction with a calm visual language.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-midnight/70 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Quick profile</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Known for shaping stories with restraint, atmosphere, and a clear sense of rhythm. The work leans on human feeling, texture, and precision rather than noise.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <p><span className="font-semibold text-white">Location:</span> Remote + available for select commissions</p>
              <p><span className="font-semibold text-white">Specialties:</span> Film, writing, content strategy</p>
              <p><span className="font-semibold text-white">Availability:</span> Open for collaborations and story-led projects</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

# Project Blueframe — Reshma M Portfolio

**Premium personal creative platform** for Reshma M — Content Creator, Writer & Freelancer.

---

## Tech Stack

| Layer | Technology |
|:---|:---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (Strict) |
| Styling | Tailwind CSS + CSS Custom Properties |
| Components | shadcn/ui + Radix UI |
| Animation | Framer Motion |
| Backend | Next.js Server Actions |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Deployment | Vercel |

---

## Quick Start

```bash
npm install
cp .env.example .env.local
# fill in your Supabase credentials
npm run dev
```

## Environment Variables

| Variable | Description |
|:---|:---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO |

## Supabase Setup

Run the migration in `supabase/migrations/001_initial_schema.sql` via the Supabase dashboard SQL editor to initialize all tables, RLS policies, indexes, and storage buckets.

## Admin Access

Navigate to `/admin/login` and sign in with your Supabase Auth administrator credentials.

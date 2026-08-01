-- ==============================================================================
-- PROJECT BLUEFRAME - INITIAL SUPABASE DATABASE SCHEMA MIGRATION
-- Following 06_DATABASE_SCHEMA.md
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('work', 'writing')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client TEXT NOT NULL,
    year INTEGER NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_slug TEXT NOT NULL,
    description TEXT NOT NULL,
    challenge TEXT,
    idea TEXT,
    execution TEXT,
    outcome TEXT,
    thumbnail TEXT NOT NULL,
    video_url TEXT,
    featured BOOLEAN DEFAULT false NOT NULL,
    published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROJECT MEDIA TABLE (Behind-the-scenes gallery)
CREATE TABLE IF NOT EXISTS public.project_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    caption TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. WRITING TABLE
CREATE TABLE IF NOT EXISTS public.writing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_slug TEXT NOT NULL,
    summary TEXT NOT NULL,
    thumbnail TEXT,
    external_url TEXT,
    content TEXT,
    featured BOOLEAN DEFAULT false NOT NULL,
    published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. AWARDS TABLE
CREATE TABLE IF NOT EXISTS public.awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    year INTEGER NOT NULL,
    project_title TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    company TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. MESSAGES TABLE (Contact form submissions)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_archived BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. SETTINGS TABLE (Single row site configuration)
CREATE TABLE IF NOT EXISTS public.settings (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    site_title TEXT NOT NULL,
    site_description TEXT NOT NULL,
    social_links JSONB DEFAULT '{}'::jsonb NOT NULL,
    featured_content JSONB DEFAULT '{}'::jsonb NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- INDEXES
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category_slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured_published ON public.projects(featured, published);
CREATE INDEX IF NOT EXISTS idx_writing_category ON public.writing(category_slug);
CREATE INDEX IF NOT EXISTS idx_writing_published ON public.writing(published);
CREATE INDEX IF NOT EXISTS idx_project_media_project_id ON public.project_media(project_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to published projects" ON public.projects FOR SELECT USING (published = true OR auth.role() = 'authenticated');
CREATE POLICY "Allow public read access to project media" ON public.project_media FOR SELECT USING (true);
CREATE POLICY "Allow public read access to published writing" ON public.writing FOR SELECT USING (published = true OR auth.role() = 'authenticated');
CREATE POLICY "Allow public read access to awards" ON public.awards FOR SELECT USING (true);
CREATE POLICY "Allow public read access to testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access to settings" ON public.settings FOR SELECT USING (true);

-- PUBLIC INSERT POLICY FOR MESSAGES
CREATE POLICY "Allow public insert to messages" ON public.messages FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS POLICIES (Authenticated single admin)
CREATE POLICY "Allow admin all access to categories" ON public.categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin all access to projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin all access to project media" ON public.project_media FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin all access to writing" ON public.writing FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin all access to awards" ON public.awards FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin all access to testimonials" ON public.testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin all access to messages" ON public.messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin all access to settings" ON public.settings FOR ALL TO authenticated USING (true);

-- ==============================================================================
-- STORAGE BUCKETS INITIALIZATION
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public) VALUES ('project-thumbnails', 'project-thumbnails', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('bts-gallery', 'bts-gallery', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('writing-thumbnails', 'writing-thumbnails', true) ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public read storage project-thumbnails" ON storage.objects FOR SELECT USING (bucket_id = 'project-thumbnails');
CREATE POLICY "Admin write storage project-thumbnails" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-thumbnails');
CREATE POLICY "Public read storage bts-gallery" ON storage.objects FOR SELECT USING (bucket_id = 'bts-gallery');
CREATE POLICY "Admin write storage bts-gallery" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'bts-gallery');
CREATE POLICY "Public read storage writing-thumbnails" ON storage.objects FOR SELECT USING (bucket_id = 'writing-thumbnails');
CREATE POLICY "Admin write storage writing-thumbnails" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'writing-thumbnails');

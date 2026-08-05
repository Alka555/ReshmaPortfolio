import { MetadataRoute } from "next";
import { getProjectsAction } from "@/actions/projects.actions";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reshmam.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/writing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const { data: projects = [] } = await getProjectsAction({ publishedOnly: true });

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project:any) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: new Date(project.updated_at || new Date()),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}

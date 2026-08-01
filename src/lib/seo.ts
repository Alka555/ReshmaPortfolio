import { Metadata } from "next";
import { siteConfig } from "@/config/site";

const siteUrl = siteConfig.url;

/**
 * Generates structured Metadata for any public page.
 */
export function generatePageMetadata({
  title,
  description,
  image,
  path,
  keywords,
}: {
  title: string;
  description: string;
  image?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = path ? `${siteUrl}${path}` : siteUrl;
  const ogImage = image || "/og-default.jpg";

  return {
    title,
    description,
    keywords: keywords || [],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Generates JSON-LD structured data for a Project showcase page.
 */
export function projectJsonLd(project: {
  title: string;
  description: string;
  slug: string;
  thumbnail: string;
  client: string;
  year: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${siteUrl}/work/${project.slug}`,
    image: project.thumbnail,
    creator: {
      "@type": "Person",
      name: siteConfig.owner,
      url: siteUrl,
    },
    dateCreated: `${project.year}`,
    client: project.client,
  };
}

/**
 * Generates JSON-LD Person schema for the About page.
 */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.owner,
    url: siteUrl,
    jobTitle: "Content Creator, Writer & Freelancer",
    description: siteConfig.description,
    sameAs: [
      siteConfig.socialLinks.instagram,
      // siteConfig.socialLinks.youtube,
      siteConfig.socialLinks.facebook,
      siteConfig.socialLinks.linkedin,
      siteConfig.socialLinks.twitter,
    ],
  };
}

/**
 * Generates JSON-LD WebSite schema for the Home page.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    author: { "@type": "Person", name: siteConfig.owner },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/work?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

import { notFound } from "next/navigation";
import { getClient } from "@/apollo/register-client";
import { localizedPath } from "@/constants/routes";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { fetchPageByUri } from "@/modules/cms/services/cms-page-service";

/**
 * @param {string[]} parts
 */
function toWpUri(parts) {
  const clean = parts.filter(Boolean).join("/");
  return `/${clean}/`;
}

/** @param {{ params: Promise<{ locale: string; slug: string[] }> }} props */
export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const uri = toWpUri(slug || []);
  let page = null;
  try {
    page = await fetchPageByUri(getClient(), uri);
  } catch {
    page = null;
  }

  const path = localizedPath(locale, `/${(slug || []).join("/")}`);
  if (!page) {
    return buildPageMetadata({
      title: "Page",
      path,
      locale,
    });
  }

  const descriptionRaw = page.excerpt || page.content || "";
  const description = String(descriptionRaw).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  return buildPageMetadata({
    title: String(page.title || "Page").replace(/<[^>]+>/g, "").trim() || "Page",
    description: description.slice(0, 160),
    path,
    imageUrl: page.featuredImage?.node?.sourceUrl,
    locale,
  });
}

/** @param {{ params: Promise<{ locale: string; slug: string[] }> }} props */
export default async function CmsCatchAllPage({ params }) {
  const { slug } = await params;
  const uri = toWpUri(slug || []);
  let page = null;
  try {
    page = await fetchPageByUri(getClient(), uri);
  } catch {
    page = null;
  }
  if (!page) notFound();

  return (
    <article className="prose prose-zinc mx-auto max-w-3xl dark:prose-invert">
      <h1 dangerouslySetInnerHTML={{ __html: page.title || "" }} />
      <div dangerouslySetInnerHTML={{ __html: page.content || "" }} />
    </article>
  );
}

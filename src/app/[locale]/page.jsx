import { getClient } from "@/apollo/register-client";
import { homePath, productsPath } from "@/constants/routes";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { PageAcfSections } from "@/modules/cms/components/PageAcfSections";
import { fetchPageByUri } from "@/modules/cms/services/cms-page-service";

function toText(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {{ params: Promise<{ locale: string }> }} props */
export async function generateMetadata({ params }) {
  const { locale } = await params;
  let page = null;
  try {
    page = await fetchPageByUri(getClient(), "/");
  } catch {
    page = null;
  }

  const title = toText(page?.acfFields?.heading || page?.title || "Accueil") || "Accueil";
  const description = toText(
    page?.acfFields?.bannerDescription || page?.excerpt || page?.content || "",
  ).slice(0, 160);

  return buildPageMetadata({
    title,
    description: description || title,
    path: homePath(locale),
    imageUrl: page?.acfFields?.bannerImage?.node?.sourceUrl || page?.featuredImage?.node?.sourceUrl,
    locale,
  });
}

/** @param {{ params: Promise<{ locale: string }> }} props */
export default async function HomePage({ params }) {
  const { locale } = await params;
  let page = null;
  try {
    page = await fetchPageByUri(getClient(), "/");
  } catch {
    page = null;
  }

  const acf = page?.acfFields || null;
  const title = toText(acf?.heading || page?.title || "Boutique headless modulaire");
  const content = page?.content || "";

  return (
    <div className="space-y-10">
      <PageAcfSections
        acf={acf}
        locale={locale}
        fallbackTitle={title}
        fallbackBannerCta={{ label: "Voir les produits", href: productsPath(locale) }}
      />

      {content ? (
        <section className="prose prose-zinc max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </section>
      ) : null}
    </div>
  );
}

import { notFound } from "next/navigation";
import { getClient } from "@/apollo/register-client";
import { getPublicEnv } from "@/config/env";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { productJsonLd } from "@/lib/seo/json-ld";
import { fetchProductBySlug } from "@/modules/product/services/product-service";
import { ProductPageShell } from "@/modules/product/components/ProductPageShell";
import { productPath } from "@/constants/routes";
import { parsePrice } from "@/modules/product/utils/parse-price";

/** @param {{ params: Promise<{ locale: string; slug: string }> }} props */
export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const client = getClient();
  let product = null;
  try {
    product = await fetchProductBySlug(client, slug);
  } catch {
    product = null;
  }
  if (!product) {
    return buildPageMetadata({
      title: "Product",
      path: productPath(locale, slug),
      locale,
    });
  }

  const { siteUrl } = getPublicEnv();
  const img = product.featuredImage?.node?.sourceUrl;

  return buildPageMetadata({
    title: product.name,
    description: product.shortDescription?.replace(/<[^>]+>/g, "").slice(0, 160),
    path: productPath(locale, slug),
    imageUrl: img,
    locale,
  });
}

/** @param {{ params: Promise<{ locale: string; slug: string }> }} props */
export default async function ProductSlugPage({ params }) {
  const { locale, slug } = await params;
  const client = getClient();
  let product = null;
  try {
    product = await fetchProductBySlug(client, slug);
  } catch {
    product = null;
  }
  if (!product) notFound();

  const { siteUrl } = getPublicEnv();
  const url = `${siteUrl.replace(/\/$/, "")}${productPath(locale, slug)}`;
  const img = product.featuredImage?.node?.sourceUrl;
  const rawPrice = product.price ?? product.regularPrice ?? "0";

  const structured = productJsonLd({
    product: {
      name: product.name,
      description: product.description,
      slug: product.slug,
      price: String(parsePrice(rawPrice)),
    },
    url,
    imageUrl: img,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}
      />
      <ProductPageShell product={product} locale={locale} />
    </>
  );
}

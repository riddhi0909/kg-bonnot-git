import { notFound } from "next/navigation";
import { getClient } from "@/apollo/register-client";
import { categoryPath, productsPath } from "@/constants/routes";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  fetchCategoryWithProducts,
  fetchProductCategories,
} from "@/modules/category/services/category-service";
import { CategoryPills } from "@/modules/category/components/CategoryPills";
import { ProductGrid } from "@/modules/product/components/ProductGrid";

/** @param {{ params: Promise<{ locale: string; slug: string }> }} props */
export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const client = getClient();
  let title = `Category: ${slug}`;
  try {
    const cat = await fetchCategoryWithProducts(client, slug, { first: 1 });
    if (cat?.name) title = cat.name;
  } catch {
    /* ignore for metadata fallback */
  }
  return buildPageMetadata({
    title,
    description: "Category products",
    path: categoryPath(locale, slug),
    locale,
  });
}

/** @param {{ params: Promise<{ locale: string; slug: string }> }} props */
export default async function CategoryPage({ params }) {
  const { locale, slug } = await params;
  const client = getClient();

  let category = null;
  try {
    category = await fetchCategoryWithProducts(client, slug, { first: 40 });
  } catch {
    category = null;
  }
  if (!category) notFound();

  let categories = [];
  try {
    categories = await fetchProductCategories(client, { first: 40 });
  } catch {
    categories = [];
  }

  const products = category.products?.nodes ?? [];

  return (
    <div className="space-y-8">
      {categories.length > 0 ? (
        <CategoryPills
          categories={categories}
          activeSlug={slug}
          basePath={productsPath(locale)}
        />
      ) : null}
      <h1 className="text-2xl font-bold">{category.name}</h1>
      {products.length ? (
        <ProductGrid products={products} locale={locale} />
      ) : (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          No product in this category.
        </div>
      )}
    </div>
  );
}

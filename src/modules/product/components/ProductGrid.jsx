"use client";

import { ProductCard } from "@/modules/product/components/ProductCard";
import { productPath } from "@/modules/product/routes/paths";

/**
 * @param {{ products: object[]; locale: string }} props
 */
export function ProductGrid({ products, locale }) {
  if (!products?.length) {
    return (
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        No products found.
      </p>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard
            product={p}
            locale={locale}
            href={productPath(locale, p.slug)}
          />
        </li>
      ))}
    </ul>
  );
}

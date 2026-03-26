"use client";

import Link from "next/link";
import { useCurrency } from "@/modules/common/providers/currency-context";
import { parsePrice } from "@/modules/product/utils/parse-price";
import { cn } from "@/modules/common/utils/cn";

/**
 * @param {{ product: object; locale: string; href: string; className?: string }} props
 */
export function ProductCard({ product, locale, href, className }) {
  const { format } = useCurrency();
  const img = product.featuredImage?.node ?? product.image ?? null;
  const title = product.name || product.slug || "Produit sans titre";
  const rawPrice = product.price ?? product.regularPrice ?? "0";
  const baseNum = parsePrice(rawPrice);
  const hasPrice = baseNum > 0;

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900">
        {img?.sourceUrl ? (
          <img
            src={img.sourceUrl}
            alt={img.altText || title}
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            Aucune image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h2 className="line-clamp-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <p className="mt-auto text-lg font-medium text-emerald-700 dark:text-emerald-400">
          {hasPrice
            ? format(baseNum, locale === "fr" ? "fr-FR" : "en-US")
            : "Prix sur demande"}
        </p>
      </div>
    </Link>
  );
}

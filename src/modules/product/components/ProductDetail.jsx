"use client";

import { useMemo, useState } from "react";
import { useCurrency } from "@/modules/common/providers/currency-context";
import { parsePrice } from "@/modules/product/utils/parse-price";

/**
 * @param {{ product: object; locale: string; onAddToCart?: () => void }} props
 */
export function ProductDetail({ product, locale, onAddToCart }) {
  const { format } = useCurrency();
  const images = useMemo(() => {
    const primaryImage =
      product.featuredImage?.node ??
      product.image ??
      null;
    const first = primaryImage?.sourceUrl
      ? [
          {
            sourceUrl: primaryImage.sourceUrl,
            altText: primaryImage.altText || product.name,
          },
        ]
      : [];
    const gallery = product.galleryImages?.nodes ?? [];
    const seen = new Set(first.map((i) => i.sourceUrl));
    const merged = [...first];
    for (const g of gallery) {
      if (g?.sourceUrl && !seen.has(g.sourceUrl)) {
        merged.push(g);
        seen.add(g.sourceUrl);
      }
    }
    return merged;
  }, [product]);
  const [active, setActive] = useState(0);
  const activeImg = images[active] || images[0] || null;
  const rawPrice = product.price ?? product.regularPrice ?? "0";
  const baseNum = parsePrice(rawPrice);
  const priceLabel = baseNum > 0 ? format(baseNum, locale === "fr" ? "fr-FR" : "en-US") : rawPrice;
  const breadcrumbs = ["Accueil", "Joaillerie", product.name];
  const descriptionHtml =
    product.description || product.shortDescription || "<p>Aucune description.</p>";

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr]">
      <div>
        <div className="relative aspect-[4/4] overflow-hidden bg-zinc-100">
          {activeImg?.sourceUrl ? (
            <img
              src={activeImg.sourceUrl}
              alt={activeImg.altText || product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-500">
              Aucune image
            </div>
          )}
        </div>
        {images.length > 1 ? (
          <ul className="mt-3 flex gap-2 overflow-auto">
            {images.map((im, idx) => (
              <li key={`${im.sourceUrl}-${idx}`}>
                <button
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`h-20 w-20 overflow-hidden border ${
                    idx === active ? "border-zinc-900" : "border-zinc-300"
                  }`}
                >
                  <img
                    src={im.sourceUrl}
                    alt={im.altText || product.name}
                    className="h-full w-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="space-y-4">
        <p className="text-sm text-zinc-500">
          {breadcrumbs.map((b, i) => (
            <span key={b}>
              {b}
              {i < breadcrumbs.length - 1 ? " > " : ""}
            </span>
          ))}
        </p>
        <h1 className="font-serif text-5xl leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
          {product.name}
        </h1>
        <p className="inline-block bg-zinc-100 px-3 py-2 text-2xl font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
          {priceLabel}
        </p>
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <h3>Description</h3>
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="inline-flex items-center justify-center gap-2 bg-[#071944] px-6 py-3 text-white transition hover:bg-[#0a245f]"
          >
            Ajouter au panier <span aria-hidden>→</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 border border-zinc-400 px-6 py-3 text-zinc-900 transition hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Créer avec cette pierre <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

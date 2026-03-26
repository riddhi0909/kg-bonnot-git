"use client";

import Link from "next/link";
import { homePath, localizedPath } from "@/constants/routes";
import { LocaleCurrencyCompact } from "@/modules/common/components/LocaleCurrencyCompact";
import { CartDrawer } from "@/modules/cart/components/CartDrawer";
import { useCart } from "@/modules/cart/hooks/useCart";
import { BonnotMegaNav } from "@/modules/menu/components/BonnotMegaNav";
import { MenuNavClient } from "@/modules/menu/components/MenuNavClient";
import { resolveMenuLink } from "@/modules/menu/utils/menu-link";
import { menuItemHasClass } from "@/modules/menu/utils/menu-classes";

const HEADER_LOGO_URL =
  "https://www.bonnot-paris.com/cdn/shop/files/6676ad88f809d1dbccd81d0f_Master.svg?v=1755149143&width=160";

/**
 * @param {object[]} items
 * @param {string} locale
 */
function contactHrefFromMenu(items, locale) {
  for (const it of items) {
    if (
      menuItemHasClass(it, "is-contact") ||
      menuItemHasClass(it, "contact-cta")
    ) {
      return resolveMenuLink(locale, it.url, it.path);
    }
  }
  const p = process.env.NEXT_PUBLIC_CONTACT_PATH;
  if (p) {
    return {
      href: localizedPath(locale, p.startsWith("/") ? p : `/${p}`),
      external: false,
    };
  }
  return { href: homePath(locale), external: false };
}

/**
 * @param {{ locale: string; menuItems: object[]; announcement: string | null }} props
 */
export function BonnotHeaderBar({ locale, menuItems, announcement }) {
  const topLine =
    announcement ||
    process.env.NEXT_PUBLIC_TOP_BAR_TEXT?.trim() ||
    "Créez votre bijou avec une pierre choisie directement";

  const contact = contactHrefFromMenu(menuItems || [], locale);
  const { lines, drawerOpen, openDrawer, closeDrawer } = useCart();
  const lineCount = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <>
      <div
        className="relative bg-[#1a2744] px-4 py-2.5 text-[13px] font-medium tracking-wide text-white md:px-10"
        suppressHydrationWarning
      >
        <p className="px-8 text-center md:px-12">{topLine}</p>
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 text-base opacity-95 md:right-10"
          aria-hidden
        >
          →
        </span>
      </div>

      <header
        className="sticky top-0 z-50 border-b border-zinc-200/70 bg-[#faf9f7]"
        suppressHydrationWarning
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-y-3 px-4 py-3.5 md:flex-nowrap md:gap-4 md:px-8">
          <Link
            href={homePath(locale)}
            className="flex shrink-0 items-center no-underline"
          >
            <img
              src={HEADER_LOGO_URL}
              alt="Bonnot Paris"
              className="h-8 w-auto md:h-9"
            />
          </Link>

          {menuItems?.length ? (
            <BonnotMegaNav locale={locale} items={menuItems} />
          ) : (
            <div className="flex flex-1 justify-center">
              <MenuNavClient locale={locale} items={[]} />
            </div>
          )}

          <div className="ml-auto flex w-full shrink-0 items-center justify-end gap-3 sm:w-auto md:gap-5">
            <LocaleCurrencyCompact current={locale} />

            <button
              type="button"
              onClick={openDrawer}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-zinc-900 text-zinc-900 transition hover:bg-white/80"
              aria-label="Panier"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 7h2l1 12h10l1-12h2M9 7V5a3 3 0 016 0v2"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              {lineCount > 0 ? (
                <span className="absolute ml-5 -mt-5 rounded-full bg-zinc-900 px-1.5 text-[10px] text-white">
                  {lineCount}
                </span>
              ) : null}
            </button>

            {contact.external ? (
              <a
                href={contact.href}
                className="inline-flex shrink-0 items-center gap-2 bg-[#1a2744] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#243352] md:px-5"
              >
                Contactez-nous
                <span className="text-sm leading-none" aria-hidden>
                  →
                </span>
              </a>
            ) : (
              <Link
                href={contact.href}
                className="inline-flex shrink-0 items-center gap-2 bg-[#1a2744] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#243352] md:px-5"
              >
                Contactez-nous
                <span className="text-sm leading-none" aria-hidden>
                  →
                </span>
              </Link>
            )}
          </div>
        </div>
      </header>
      <CartDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        locale={locale}
      />
    </>
  );
}

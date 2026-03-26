"use client";

import Image from "next/image";
import Link from "next/link";
import { resolveMenuLink } from "@/modules/menu/utils/menu-link";
import { megaMenuImageFromItem } from "@/modules/menu/utils/mega-image";
import { menuItemHasClass } from "@/modules/menu/utils/menu-classes";

function ChevronDown({ className }) {
  return (
    <svg
      className={className}
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * @param {{ locale: string; item: object }} props
 */
function MegaLink({ locale, item }) {
  const { href, external } = resolveMenuLink(locale, item.url, item.path);
  const cls =
    "block break-inside-avoid py-1.5 text-[15px] font-normal text-[#6b5e54] transition hover:text-zinc-900";
  if (external) {
    return (
      <a
        href={href}
        target={item.target === "_blank" ? "_blank" : undefined}
        rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
        className={cls}
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {item.label}
    </Link>
  );
}

/**
 * @param {{ locale: string; item: object }} props
 */
function NavRowItem({ locale, item }) {
  const kids = item.childItems?.nodes ?? [];
  const hasMega = kids.length > 0;
  const accent = menuItemHasClass(item, "menu-accent");
  const { href, external } = resolveMenuLink(locale, item.url, item.path);
  const img = hasMega ? megaMenuImageFromItem(item) : null;

  const labelCls = [
    "flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2.5 text-[15px] font-medium tracking-wide transition-colors",
    accent ? "text-[#a67c52]" : "text-zinc-800",
    hasMega
      ? "rounded-sm group-hover/mega:bg-zinc-200/70 group-hover/mega:text-zinc-900"
      : "rounded-sm hover:bg-zinc-100",
  ].join(" ");

  if (!hasMega) {
    if (external) {
      return (
        <a
          href={href}
          className={labelCls}
          target={item.target === "_blank" ? "_blank" : undefined}
          rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
        >
          {item.label}
        </a>
      );
    }
    return (
      <Link href={href} className={labelCls}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group/mega relative">
      <button
        type="button"
        className={`${labelCls} cursor-default border-0 bg-transparent font-[inherit]`}
        aria-expanded={false}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className="shrink-0 opacity-50" />
      </button>
      <div
        className="invisible absolute left-1/2 top-full z-50 w-[min(58rem,calc(100vw-1.5rem))] -translate-x-1/2 pt-2 opacity-0 transition duration-200 ease-out group-hover/mega:visible group-hover/mega:opacity-100"
        role="region"
        aria-label={item.label}
      >
        <div className="max-h-[min(28rem,78vh)] overflow-auto rounded-sm border border-zinc-200/60 bg-[#faf9f7] px-6 py-7 shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:px-9 md:py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-14">
            {img?.src ? (
              <div className="flex justify-center md:justify-start">
                <div className="relative w-full max-w-[15.5rem] bg-white p-3 shadow-sm md:max-w-[17rem]">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={img.src}
                      alt={img.alt || item.label}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 272px"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:block" aria-hidden />
            )}
            <div className="min-w-0 pt-1">
              <p className="font-serif text-[1.75rem] font-medium leading-tight tracking-tight text-zinc-900 md:text-[2rem]">
                {item.label}
              </p>
              <div className="mt-6 columns-1 gap-x-14 gap-y-0.5 sm:columns-2">
                {kids.map((c) => (
                  <MegaLink key={c.id} locale={locale} item={c} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{ locale: string; items: object[] }} props
 */
export function BonnotMegaNav({ locale, items }) {
  if (!items?.length) return null;

  const visible = items.filter(
    (item) =>
      !menuItemHasClass(item, "is-contact") &&
      !menuItemHasClass(item, "contact-cta"),
  );

  return (
    <nav
      className="flex flex-1 flex-wrap items-center justify-center gap-0.5 lg:gap-1"
      aria-label="Primary"
    >
      {visible.map((item) => (
        <NavRowItem key={item.id} locale={locale} item={item} />
      ))}
    </nav>
  );
}

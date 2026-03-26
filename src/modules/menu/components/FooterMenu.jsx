import Link from "next/link";
import { resolveMenuLink } from "@/modules/menu/utils/menu-link";

/**
 * @param {{ locale: string; items: object[] }} props
 */
export function FooterMenu({ locale, items }) {
  if (!items?.length) return null;

  return (
    <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <FooterColumn key={item.id} locale={locale} item={item} />
      ))}
    </nav>
  );
}

/**
 * @param {{ locale: string; item: object }} props
 */
function FooterColumn({ locale, item }) {
  const { href, external } = resolveMenuLink(locale, item.url, item.path);
  const children = item.childItems?.nodes ?? [];

  return (
    <div className="space-y-3">
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-zinc-100 hover:underline"
        >
          {item.label}
        </a>
      ) : (
        <Link href={href} className="text-sm font-semibold text-zinc-100 hover:underline">
          {item.label}
        </Link>
      )}
      {children.length ? (
        <ul className="space-y-2">
          {children.map((child) => (
            <li key={child.id}>
              <FooterChild locale={locale} item={child} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * @param {{ locale: string; item: object }} props
 */
function FooterChild({ locale, item }) {
  const { href, external } = resolveMenuLink(locale, item.url, item.path);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-zinc-300 hover:text-white"
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link href={href} className="text-sm text-zinc-300 hover:text-white">
      {item.label}
    </Link>
  );
}

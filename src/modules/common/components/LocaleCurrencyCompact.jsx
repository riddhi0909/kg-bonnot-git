"use client";

import { usePathname, useRouter } from "next/navigation";
import { defaultLocale, localeCodes } from "@/config/i18n";
import { supportedCurrencies } from "@/config/currency";
import { useCurrency } from "@/modules/common/providers/currency-context";

const FLAGS = {
  fr: "🇫🇷",
  de: "🇩🇪",
  en: "🇬🇧",
  es: "🇪🇸",
  it: "🇮🇹",
  "pt-br": "🇧🇷",
  "zh-cn": "🇨🇳",
};

const SYMBOL = { EUR: "€", USD: "$" };

/**
 * BONNOT-style: flag · dash · currency (compact selects).
 * @param {{ current: string }} props
 */
export function LocaleCurrencyCompact({ current }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();

  function switchLocale(next) {
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;
    const parts = pathname.split("/").filter(Boolean);
    const hasLocalePrefix = parts.length && localeCodes.includes(parts[0]);

    if (hasLocalePrefix) {
      if (next === defaultLocale) {
        parts.shift();
      } else {
        parts[0] = next;
      }
    } else {
      if (next !== defaultLocale) {
        parts.unshift(next);
      }
    }
    const nextPath = `/${parts.join("/")}` || "/";
    router.push(nextPath === "//" ? "/" : nextPath);
  }

  return (
    <div className="flex items-center gap-1 text-[15px] text-zinc-800">
      <label className="relative inline-flex cursor-pointer items-center">
        <span className="sr-only">Langue</span>
        <span className="pointer-events-none text-lg leading-none" aria-hidden>
          {FLAGS[current] || "🌐"}
        </span>
        <select
          value={current}
          onChange={(e) => switchLocale(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {localeCodes.map((code) => (
            <option key={code} value={code}>
              {code.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
      <span className="px-0.5 text-zinc-500" aria-hidden>
        -
      </span>
      <label className="inline-flex items-center">
        <span className="sr-only">Devise</span>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="cursor-pointer border-0 bg-transparent p-0 font-medium text-zinc-800 focus:outline-none focus:ring-0"
        >
          {supportedCurrencies.map((c) => (
            <option key={c} value={c}>
              {SYMBOL[c] || c}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

import { FooterMenu } from "@/modules/menu/components/FooterMenu";

/**
 * @param {{ locale: string; menuItems?: object[] }} props
 */
export function SiteFooter({ locale, menuItems = [] }) {
  return (
    <footer className="mt-12 border-t border-zinc-800 bg-[#111827] text-zinc-200">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <FooterMenu locale={locale} items={menuItems} />
      </div>
    </footer>
  );
}

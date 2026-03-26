import Link from "next/link";
import { productsPath } from "@/constants/routes";

/** @param {{ params: Promise<{ locale: string }> }} props */
export default async function HomePage({ params }) {
  const { locale } = await params;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Boutique headless modulaire
      </h1>
      <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
        Next.js App Router, Apollo Client et modules fonctionnels stricts.
        Connectez votre endpoint WordPress + WooCommerce + WPGraphQL via les variables d&apos;environnement.
      </p>
      <Link
        href={productsPath(locale)}
        className="inline-flex rounded-lg bg-zinc-900 px-5 py-2.5 text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Voir les produits
      </Link>
    </div>
  );
}

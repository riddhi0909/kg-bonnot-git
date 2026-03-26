import { GET_PRODUCT_BY_SLUG, GET_PRODUCTS } from "@/modules/product/api/queries";

/**
 * @param {import('@apollo/client').ApolloClient} client
 * @param {{ first?: number; after?: string | null }} vars
 */
export async function fetchProducts(client, vars = {}) {
  const { data, errors } = await client.query({
    query: GET_PRODUCTS,
    variables: {
      first: vars.first ?? 12,
      after: vars.after ?? null,
    },
    fetchPolicy: "no-cache",
  });
  if (errors?.length) throw new Error(errors.map((e) => e.message).join(", "));
  return data?.products ?? { nodes: [], pageInfo: {} };
}

/**
 * @param {import('@apollo/client').ApolloClient} client
 * @param {string} slug
 */
export async function fetchProductBySlug(client, slug) {
  const { data, errors } = await client.query({
    query: GET_PRODUCT_BY_SLUG,
    variables: { id: slug },
    fetchPolicy: "no-cache",
  });
  if (errors?.length) throw new Error(errors.map((e) => e.message).join(", "));
  return data?.product ?? null;
}

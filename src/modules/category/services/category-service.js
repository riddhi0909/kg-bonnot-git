import {
  GET_PRODUCTS_BY_CATEGORY_ID,
  GET_CATEGORY_PRODUCTS_BY_WHERE,
  GET_CATEGORY_WITH_PRODUCTS,
  GET_PRODUCT_CATEGORIES,
} from "@/modules/category/api/queries";

/**
 * @param {import('@apollo/client').ApolloClient} client
 * @param {{ first?: number }} vars
 */
export async function fetchProductCategories(client, vars = {}) {
  const { data, errors } = await client.query({
    query: GET_PRODUCT_CATEGORIES,
    variables: { first: vars.first ?? 50 },
    fetchPolicy: "network-only",
  });
  if (errors?.length) throw new Error(errors.map((e) => e.message).join(", "));
  return data?.productCategories?.nodes ?? [];
}

/**
 * @param {import('@apollo/client').ApolloClient} client
 * @param {string} slug
 * @param {{ first?: number }} [vars]
 */
export async function fetchCategoryWithProducts(client, slug, vars = {}) {
  const first = vars.first ?? 24;

  // 1) Resolve category node by slug.
  let category = null;
  try {
    const { data, errors } = await client.query({
      query: GET_CATEGORY_WITH_PRODUCTS,
      variables: {
        id: slug,
      },
      fetchPolicy: "network-only",
    });

    if (errors?.length) throw new Error(errors.map((e) => e.message).join(", "));
    category = data?.productCategory ?? null;
  } catch {
    category = null;
  }

  if (!category) return null;

  // 2) Strict product filtering by category database ID.
  try {
    const { data, errors } = await client.query({
      query: GET_PRODUCTS_BY_CATEGORY_ID,
      variables: {
        categoryId: Number(category.databaseId),
        first,
      },
      fetchPolicy: "network-only",
    });

    if (errors?.length) throw new Error(errors.map((e) => e.message).join(", "));
    return {
      ...category,
      products: {
        nodes: data?.products?.nodes ?? [],
      },
    };
  } catch {
    // 3) Fallback for schemas that only support where.category by slug.
    const { data, errors } = await client.query({
      query: GET_CATEGORY_PRODUCTS_BY_WHERE,
      variables: {
        slug,
        first,
      },
      fetchPolicy: "network-only",
    });

    if (errors?.length) throw new Error(errors.map((e) => e.message).join(", "));
    return {
      ...category,
      products: {
        nodes: data?.products?.nodes ?? [],
      },
    };
  }
}

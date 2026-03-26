import { GET_PAGE_BY_URI } from "@/modules/cms/api/queries";

/**
 * @param {import('@apollo/client').ApolloClient} client
 * @param {string} uri e.g. "/about/" or "/legal/privacy/"
 */
export async function fetchPageByUri(client, uri) {
  const normalized = uri.startsWith("/") ? uri : `/${uri}`;
  const uriText = normalized.endsWith("/") ? normalized : `${normalized}/`;
  const { data, errors } = await client.query({
    query: GET_PAGE_BY_URI,
    variables: {
      uriId: uriText,
      uriText,
    },
    fetchPolicy: "network-only",
  });
  if (errors?.length) throw new Error(errors.map((e) => e.message).join(", "));
  return data?.page ?? data?.nodeByUri ?? null;
}

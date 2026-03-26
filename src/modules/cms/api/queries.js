import { gql } from "@apollo/client";

export const GET_PAGE_BY_URI = gql`
  query GetPageByUri($uriId: ID!, $uriText: String!) {
    page(id: $uriId, idType: URI) {
      id
      slug
      uri
      title
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
    nodeByUri(uri: $uriText) {
      __typename
      ... on Page {
        id
        slug
        uri
        title
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

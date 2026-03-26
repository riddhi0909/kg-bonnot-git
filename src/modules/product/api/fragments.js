import { gql } from "@apollo/client";

/**
 * Reusable fields for list cards. Adjust inline fragments for your WooCommerce product types.
 */
export const PRODUCT_CARD_FRAGMENT = gql`
  fragment ProductCardFields on Product {
    id
    databaseId
    slug
    name
    type
    ... on SimpleProduct {
      price
      regularPrice
      salePrice
    }
    ... on VariableProduct {
      price
      regularPrice
    }
    ... on NodeWithFeaturedImage {
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const PRODUCT_DETAIL_FRAGMENT = gql`
  fragment ProductDetailFields on Product {
    id
    databaseId
    slug
    name
    description
    shortDescription
    type
    ... on SimpleProduct {
      price
      regularPrice
      salePrice
      stockStatus
      image {
        sourceUrl
        altText
      }
    }
    ... on VariableProduct {
      price
      regularPrice
      stockStatus
      image {
        sourceUrl
        altText
      }
    }
    ... on NodeWithFeaturedImage {
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

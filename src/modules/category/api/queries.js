import { gql } from "@apollo/client";

export const GET_PRODUCT_CATEGORIES = gql`
  query GetProductCategories($first: Int!) {
    productCategories(first: $first, where: { hideEmpty: true }) {
      nodes {
        id
        databaseId
        slug
        name
        count
      }
    }
  }
`;

export const GET_CATEGORY_WITH_PRODUCTS = gql`
  query GetCategoryWithProducts($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      id
      databaseId
      slug
      name
    }
  }
`;

/**
 * Some WPGraphQL/Woo installs expose category filtering through products(where:{category}).
 * Keep as compatibility fallback.
 */
export const GET_CATEGORY_PRODUCTS_BY_WHERE = gql`
  query GetCategoryProductsByWhere($slug: String!, $first: Int!) {
    products(first: $first, where: { category: $slug }) {
      nodes {
        id
        databaseId
        slug
        name
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
        ... on VariableProduct {
          price
          regularPrice
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_ID = gql`
  query GetProductsByCategoryId($categoryId: Int!, $first: Int!) {
    products(first: $first, where: { categoryId: $categoryId }) {
      nodes {
        id
        databaseId
        slug
        name
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
        ... on VariableProduct {
          price
          regularPrice
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

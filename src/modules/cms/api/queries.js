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
      acfFields {
        heading
        bannerDescription
        showBannerSection
        firstBannerButtonTitle
        firstBannerButtonLink
        secondBannerButtonTitle
        secondBannerButtonLink
        list {
          title
        }
        bannerImage {
          node {
            sourceUrl
            altText
          }
        }
        icaTitle
        icaDescription
        showIcaSection
        icaButtonTitle
        icaButtonLink
        icaImage {
          node {
            sourceUrl
            altText
          }
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      template {
        templateName
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
        acfFields {
          heading
          bannerDescription
          showBannerSection
          firstBannerButtonTitle
          firstBannerButtonLink
          secondBannerButtonTitle
          secondBannerButtonLink
          list {
            title
          }
          bannerImage {
            node {
              sourceUrl
              altText
            }
          }
          icaTitle
          icaDescription
          showIcaSection
          icaButtonTitle
          icaButtonLink
          icaImage {
            node {
              sourceUrl
              altText
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        template {
          templateName
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($first: Int!) {
    posts(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        slug
        uri
        title
        excerpt
        date
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

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!, $idType: PostIdType = SLUG) {
    post(id: $slug, idType: $idType) {
      id
      slug
      uri
      title
      excerpt
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

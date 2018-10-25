import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostLinkWithImageCollection from "../components/post-link-with-image-collection";
import Pagination from "../components/pagination";
import Seo from "../components/seo";
import styles from "./collection.module.css";

export default ({ data, pageContext }) => (
  <Layout>
    <Seo
      path={pageContext.slug}
      title={pageContext.configTitle}
      useStructuredData={false}
    />

    <h1 className={styles.title}>{pageContext.configTitle}</h1>

    <PostLinkWithImageCollection items={data.allMarkdownRemark.edges} />

    <Pagination
      previousPage={pageContext.previousPage}
      nextPage={pageContext.nextPage}
    />
  </Layout>
);

export const query = graphql`
  query($collection: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        fields: {
          collection: { eq: $collection }
        }
      }
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          fields {
            slug
            image {
              childImageSharp {
                featuredThumb: resize(
                  width: 400
                  height: 250
                  cropFocus: CENTER
                ) {
                  src
                }
              }
            }
          }
          frontmatter {
            title
            date
            displayDate: date(formatString: "DD MMMM YYYY")
            excerpt
          }
          excerpt(
            pruneLength: 120
            truncate: false
          )
        }
      }
    }
  }
`;

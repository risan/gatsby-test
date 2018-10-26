import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import PostLinkCollection from "../components/post-link-collection";
import Seo from "../components/seo";
import styles from "./collection.module.css";

export default ({ data, pageContext }) => (
  <Layout>
    <Seo
      path={pageContext.slug}
      title={pageContext.configTitle}
      image={data.file.childImageSharp.openGraph}
      useStructuredData={false}
    />

    <h1 className={styles.title}>{pageContext.configTitle}</h1>

    <PostLinkCollection items={data.allMarkdownRemark.edges} />

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
          collection: {
            eq: $collection
          }
        }
      }
      sort: {
        fields: frontmatter___date
        order: DESC
      }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            datePretty: date(formatString: "DD MMM YYYY")
          }
        }
      }
    }
    file(relativePath: { eq: "images/default-featured.jpg" }) {
      childImageSharp {
        openGraph: original {
          src
          width
          height
        }
      }
    }
  }
`;

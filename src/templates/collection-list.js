import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import Seo from "../components/seo";
import styles from "./collection-list.module.css";

export default ({ data, pageContext }) => (
  <Layout>
    <Seo
      path={pageContext.slug}
      title={pageContext.configTitle}
      useStructuredData={false}
    />

    <h1 className={styles.title}>{pageContext.configTitle}</h1>

    <ul className={styles.list}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <li key={node.id} className={styles.item}>
          <Link to={node.fields.slug} className={styles.link}>
            {node.frontmatter.title}
          </Link>
          <span className={styles.date}>
            {node.frontmatter.datePretty}
          </span>
        </li>
      ))}
    </ul>

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
  }
`;

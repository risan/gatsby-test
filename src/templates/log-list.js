import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Pagination from "../components/pagination";

export default ({ data, pageContext }) => (
  <Layout>
    <h2>Logs</h2>
    <ul>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <li key={node.id}>
          <Link to={node.fields.slug}>
            <span>{node.frontmatter.datePretty}</span>
            {" - "}
            <span>{node.frontmatter.title}</span>
          </Link>
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

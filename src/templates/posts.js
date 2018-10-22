import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

export default ({ data, pageContext }) => (
  <Layout>
    <ul>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <li key={node.id}>
          <Link to={node.fields.slug}>
            {node.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
    {pageContext.previousPage &&
      <Link to={pageContext.previousPage}>Newer Posts</Link>
    }
    {pageContext.nextPage &&
      <Link to={pageContext.nextPage}>Older Posts</Link>
    }
  </Layout>
);

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        fields: {
          slug: {
            regex: "/^\/posts\//"
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
            date(formatString: "DD MMMM YYYY")
          }
          excerpt(
            pruneLength: 100
            truncate: false
          )
        }
      }
    }
  }
`;

import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostLink from "../components/post-link";
import Pagination from "../components/pagination";

export default ({ data, pageContext }) => (
  <Layout>
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <PostLink
          key={node.id}
          path={node.fields.slug}
          image={node.fields.image.childImageSharp.featured_thumb.src}
          title={node.frontmatter.title}
          excerpt={node.excerpt}
          date={node.frontmatter.date}
        />
      ))}
    </div>

    <Pagination
      previousPage={pageContext.previousPage}
      nextPage={pageContext.nextPage}
    />
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
            image {
              childImageSharp {
                featured_thumb: resize(
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
            date(formatString: "DD MMMM YYYY")
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

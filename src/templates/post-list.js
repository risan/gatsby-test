import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostLink from "../components/post-link";
import Pagination from "../components/pagination";

export default ({ data, pageContext }) => (
  <Layout>
    <h2>All Posts</h2>
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <PostLink
          key={node.id}
          path={node.fields.slug}
          image={node.frontmatter.image
            ? node.frontmatter.image.childImageSharp.featuredThumb.src
            : data.file.childImageSharp.featuredThumb.src}
          title={node.frontmatter.title}
          excerpt={node.frontmatter.excerpt
            ? node.frontmatter.excerpt
            : node.excerpt}
          date={node.frontmatter.date}
          displayDate={node.frontmatter.displayDate}
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
  query(
    $collection: String!
    $skip: Int!
    $limit: Int!
    $configDefaultImage: String!
    $configThumbWidth: Int!
    $configThumbHeight: Int!
  ) {
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
            displayDate: date(formatString: "DD MMMM YYYY")
            excerpt,
            image {
              childImageSharp {
                featuredThumb: resize(
                  width: $configThumbWidth
                  height: $configThumbHeight
                  cropFocus: CENTER
                ) {
                  src
                }
              }
            }
          }
          excerpt(
            pruneLength: 120
            truncate: false
          )
        }
      }
    }
    file(relativePath: {
      eq: $configDefaultImage
    }) {
      childImageSharp {
        featuredThumb: resize(
          width: $configThumbWidth
          height: $configThumbHeight
          cropFocus: CENTER
        ) {
          src
        }
      }
    }
  }
`;

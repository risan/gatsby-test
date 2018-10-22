import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

export default ({ data, pageContext }) => (
  <Layout>
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={node.fields.slug} key={node.id}>
          <article>
            <div>
              <img src={node.fields.image.childImageSharp.featured_thumb.src} alt="Featured" />
            </div>
            <div>
              <h3>{node.frontmatter.title}</h3>
              <p>{node.excerpt}</p>
              <time>{node.frontmatter.date}</time>
            </div>
          </article>
        </Link>
      ))}
    </div>
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
            image {
              childImageSharp {
                featured_thumb: resize(width: 400) {
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
            pruneLength: 150
            truncate: false
          )
        }
      }
    }
  }
`;

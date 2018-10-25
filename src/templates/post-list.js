import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostLink from "../components/post-link";
import Pagination from "../components/pagination";
import Seo from "../components/seo";
import styles from "./collection-list.module.css";

export default ({ data, pageContext, ...rest }) => console.log({ pageContext, rest }) || (
  <Layout>
    <Seo
      path={pageContext.slug}
      title="Programming Articles and Tutorials"
      useStructuredData={false}
    />

    <h1 className={styles.title}>
      Programming Articles and Tutorials
    </h1>

    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <PostLink
          key={node.id}
          path={node.fields.slug}
          image={node.fields.image.childImageSharp.featuredThumb.src}
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

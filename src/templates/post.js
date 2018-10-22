import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => (
  <Layout>
    <article>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <span>{data.markdownRemark.frontmatter.date}</span>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </article>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: {
      slug: {
        eq: $slug
      }
    }) {
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
      }
      html
    }
  }
`;

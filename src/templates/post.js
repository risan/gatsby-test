import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import styles from "./post.module.css";

export default ({ data }) => {
  let html = data.markdownRemark.html;

  if (data.markdownRemark.tableOfContents) {
    // Remove the "Table of Contents" link from the generated TOC list.
    const TOC_SELF_LINK_PATTERN = /(<li>\s?<a href="[\S]*#table-of-contents">\s?Table of Contents\s?<\/a>\s?<\/li>)/mi
    const tocHtml = data.markdownRemark.tableOfContents.replace(
      TOC_SELF_LINK_PATTERN, ''
    );

    // Insert the TOC right after the TOC H2 heading.
    const TOC_HEADING_PATTERN = /(>\s?Table of Contents\s?<\/h2>)/mi
    html = html.replace(TOC_HEADING_PATTERN, `$1${tocHtml}`);
  }

  return (
    <Layout>
      <article>
        <h1>{data.markdownRemark.frontmatter.title}</h1>

        <p className={styles.date}>
          <span>Published on</span>{" "}
          <time dateTime={data.markdownRemark.frontmatter.date} pubdate="true">
            {data.markdownRemark.frontmatter.displayDate}
          </time>
        </p>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: {
      slug: {
        eq: $slug
      }
    }) {
      frontmatter {
        title
        date
        displayDate: date(formatString: "DD MMMM YYYY")
      }
      tableOfContents(pathToSlugField: "fields.slug")
      html
    }
  }
`;

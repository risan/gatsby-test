import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import styles from "./post.module.css";

const TOC_SELF_LINK_PATTERN = /(<li>\s?<a href="[\S]*#table-of-contents">\s?Table of Contents\s?<\/a>\s?<\/li>)/mi
const TOC_HEADING_PATTERN = /(>\s?Table of Contents\s?<\/h2>)/mi

export default ({ data }) => {
  const { fields, frontmatter, tableOfContents } = data.markdownRemark;
  let { html } = data.markdownRemark;

  if (tableOfContents) {
    // Remove the "Table of Contents" link from the generated TOC list.
    const tocHtml = tableOfContents.replace(TOC_SELF_LINK_PATTERN, '');

    // Insert the TOC right after the TOC H2 heading.
    html = html.replace(TOC_HEADING_PATTERN, `$1${tocHtml}`);
  }

  return (
    <Layout>
      <article>
        <h1>{frontmatter.title}</h1>

        <p className={styles.date}>
          <span>By {fields.author}</span>
          {" "}&middot;{" "}
          {frontmatter.updatedDate ? (
            <Fragment>
              <span>Updated on</span>{" "}
              <time dateTime={frontmatter.updatedDate} pubdate="true">
                {frontmatter.updatedDatePretty}
              </time>
            </Fragment>
          ) : (
            <time dateTime={frontmatter.publishDate} pubdate="true">
              {frontmatter.publishDatePretty}
            </time>
          )}
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
      fields {
        author
      }
      frontmatter {
        title
        publishDate: date
        publishDatePretty: date(formatString: "DD MMMM YYYY")
        updatedDate: updated_at
        updatedDatePretty: updated_at(formatString: "DD MMMM YYYY")
      }
      tableOfContents(pathToSlugField: "fields.slug")
      html
    }
  }
`;

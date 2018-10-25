import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import styles from "./post.module.css";

const TOC_SELF_LINK_PATTERN = /(<li>\s?<a href="[\S]*#table-of-contents">\s?Table of Contents\s?<\/a>\s?<\/li>)/mi
const TOC_HEADING_PATTERN = /(>\s?Table of Contents\s?<\/h2>)/mi

export default ({ data, pageContext }) => {
  const { frontmatter, fields, ...post} = data.markdownRemark;
  const site = data.site.siteMetadata;
  let { html } = post;

  if (post.tableOfContents) {
    // Remove the "Table of Contents" link from the generated TOC list.
    const tocHtml = post.tableOfContents.replace(TOC_SELF_LINK_PATTERN, '');

    // Insert the TOC right after the TOC H2 heading.
    html = html.replace(TOC_HEADING_PATTERN, `$1${tocHtml}`);
  }

  return (
    <Layout>
      <Seo
        path={fields.slug}
        title={frontmatter.title}
        description={frontmatter.excerpt ? frontmatter.excerpt : post.excerpt}
        image={fields.image.childImageSharp.openGraph}
        datePublished={frontmatter.date}
        dateModified={frontmatter.lastUpdate}
        concatenateSiteTitle={frontmatter.concatenateSiteTitle !== false}
      />

      <article>
        <h1>{frontmatter.title}</h1>

        <p className={styles.date}>
          {frontmatter.lastUpdate ? (
            <Fragment>
              <span>Updated At</span>{" "}
              <time dateTime={frontmatter.lastUpdate} pubdate="true">
                {frontmatter.lastUpdatePretty}
              </time>
            </Fragment>
          ) : (
            <time dateTime={frontmatter.date} pubdate="true">
              {frontmatter.datePretty}
            </time>
          )}
          {" "}&middot;{" "}
          <span>By {site.author}</span>
        </p>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
        image {
          childImageSharp {
            openGraph: resize(
              width: 1200
              height: 640
              cropFocus: CENTER
            ) {
              src
              width
              height
            }
          }
        }
      }
      frontmatter {
        title
        concatenateSiteTitle
        date
        datePretty: date(formatString: "DD MMMM YYYY")
        lastUpdate
        lastUpdatePretty: lastUpdate(formatString: "DD MMMM YYYY")
        excerpt
      }
      tableOfContents(pathToSlugField: "fields.slug")
      html
      excerpt(
        pruneLength: 155
        truncate: false
      )
    }
  }
`;

import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import styles from "./post.module.css";

const TOC_SELF_LINK_PATTERN = /(<li>\s?<a href="[\S]*#table-of-contents">\s?Table of Contents\s?<\/a>\s?<\/li>)/mi
const TOC_HEADING_PATTERN = /(>\s?Table of Contents\s?<\/h2>)/mi

export default ({ data }) => {
  const { frontmatter, ...post} = data.markdownRemark;
  const site = data.site.siteMetadata;
  let { html } = post;

  if (post.tableOfContents) {
    // Remove the "Table of Contents" link from the generated TOC list.
    const tocHtml = post.tableOfContents.replace(TOC_SELF_LINK_PATTERN, '');

    // Insert the TOC right after the TOC H2 heading.
    html = html.replace(TOC_HEADING_PATTERN, `$1${tocHtml}`);
  }

  const TRAILING_SLASH = /\/$/;
  const baseUrl = site.url.replace(TRAILING_SLASH, '');
  const excerpt = frontmatter.excerpt ? frontmatter.excerpt : post.excerpt;
  const image = post.fields.image.childImageSharp.original;

  const url = path => `${baseUrl}${path}`;
  const pageUrl = url(post.fields.slug);

  const schema = {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": baseUrl
    },
    headline: frontmatter.title,
    description: excerpt,
    image: url(image.src),
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      "@type": "Person",
      name: site.author
    },
    publisher: {
      "@type": "Organization",
      name: site.author,
      logo: {
        "@type": "ImageObject",
        url: site.publisherLogo
      }
    }
  };

  return (
    <Layout>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{`${frontmatter.title} | ${site.title}`}</title>
        <link rel="canonical" href={pageUrl} />
        <meta name="description" content={excerpt} />

        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={url(image.src)} />
        <meta property="og:image:width" content={image.width} />
        <meta property="og:image:height" content={image.height} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={site.twitter} />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={url(image.src)} />

        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <article>
        <h1>{frontmatter.title}</h1>

        <p className={styles.date}>
          <time dateTime={frontmatter.date} pubdate="true">
            {frontmatter.datePretty}
          </time>
          {" "}&middot;{" "}
          <span>{site.author}</span>
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
        url
        title
        author
        twitter
        publisherLogo
      }
    }
    markdownRemark(fields: {
      slug: {
        eq: $slug
      }
    }) {
      fields {
        slug
        image {
          childImageSharp {
            original {
              src
              width
              height
            }
          }
        }
      }
      frontmatter {
        title
        date
        datePretty: date(formatString: "DD MMMM YYYY")
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

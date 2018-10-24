import React from "react";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from "gatsby";

const LEADING_SLASH = /^\//;
const TRAILING_SLASH = /\/$/;

export default ({
  path,
  title,
  description,
  imagePath
}) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            url
          }
        }
        file(relativePath: {
          eq: "images/default-featured.jpg"
        }) {
          childImageSharp {
            resize(
              width: 1200
              height: 630
              cropFocus: CENTER
            ) {
              src
              width
              height
            }
          }
        }
      }
    `}
    render={data => {
      console.log({ imagePath });

      const site = data.site.siteMetadata;
      const baseUrl = site.url.replace(TRAILING_SLASH, '');

      const url = path => `${baseUrl}/${path.replace(LEADING_SLASH, '')}`;

      return (
        <Helmet htmlAttributes={{ lang: "en" }}>
          <title>{title}</title>
          <link rel="canonical" href={url(path)} />
          <meta name="description" content={description} />

          <meta property="og:url" content={url(path)} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Helmet>
      );
    }}
  />
);

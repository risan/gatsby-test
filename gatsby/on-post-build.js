const generateSitemap = require("./generate-sitemap");

module.exports = async ({ graphql, pathPrefix }) => {
  const { data } = await graphql(`
    {
      site {
        siteMetadata {
          siteUrl
          sitemap {
            importantPaths
            excludePaths
          }
        }
      }
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date
              lastUpdate
              image {
                publicURL
              }
            }
          }
        }
      }
    }
  `);

  await generateSitemap(data, pathPrefix);
};

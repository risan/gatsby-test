module.exports = {
  siteMetadata: {
    headerTitle: "Risan Bagja",
    headerDescription: "A journal of a passionate coder"
  },
  plugins: [
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "src/pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "content"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // Must be placed before prismjs plugin
          "gatsby-remark-autolink-headers",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 652
            }
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true
            }
          }
        ]
      }
    },
    "gatsby-transformer-sharp"
  ]
};

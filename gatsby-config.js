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
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
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

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
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp"
  ]
};

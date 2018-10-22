module.exports = {
  siteMetadata: {
    title: "Risan"
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

module.exports = {
  siteMetadata: {
    title: "Risan"
  },
  plugins: [
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
      resolve: "gatsby-transformer-remark"
    }
  ]
};

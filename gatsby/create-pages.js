const createMarkdownPages = require("./create-markdown-pages");
const createMarkdownListPages = require("./create-markdown-list-pages");

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              collection
            }
          }
        }
      }
    }
  `);

  const collectionCount = createMarkdownPages(data.allMarkdownRemark.edges, createPage);

  createMarkdownListPages(collectionCount, createPage);
};

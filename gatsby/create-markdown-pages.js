const getTemplate = require("./get-template");

/**
 * Create pages from markdown files.
 *
 * @param {Array} edges
 * @param {Function} createPage)
 * @return {Object}
 */
module.exports = (edges, createPage) => edges.reduce((collectionCount, { node }) => {
  const collection = node.fields.collection;

  createPage({
    path: node.fields.slug,
    component: getTemplate(collection),
    context: {
      slug: node.fields.slug
    }
  });

  if (collection) {
    collectionCount[collection] = collectionCount.hasOwnProperty(collection)
      ? collectionCount[collection] + 1
      : 1;
  }

  return collectionCount;
}, {});

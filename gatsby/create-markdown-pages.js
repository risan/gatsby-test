const resolveTemplate = require("./resolve-template");
const { mapConfigForContext } = require("./collection-config");

/**
 * Create pages from markdown files.
 *
 * @param {Array} edges
 * @param {Function} createPage)
 * @return {Object}
 */
module.exports = (edges, createPage) => edges.reduce((collectionCount, { node }) => {
  const collection = node.fields.collection;
  const collectionConfig = collection ? mapConfigForContext(collection) : {};

  createPage({
    path: node.fields.slug,
    component: resolveTemplate(node.fields.template),
    context: {
      collection,
      ...collectionConfig,
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

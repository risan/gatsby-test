const _ = require("lodash");
const {
  getPerPage,
  getPagePath,
  getTemplate
} = require("./markdown-list-helpers");

/**
 * Create markdown collection list pages.
 *
 * @param {Object} collectionCount
 * @param {Function} createPage)
 * @return {Void}
 */
module.exports = (collectionCount, createPage) => {
  _.forIn(collectionCount, (total, collection) => {
    const perPage = getPerPage(collection);
    const totalPages = Math.ceil(total / perPage);

    _.range(1, totalPages + 1).forEach(page => {
      createPage({
        path: getPagePath(collection, page),
        component: getTemplate(collection),
        context: {
          collection: collection,
          limit: perPage,
          skip: (page - 1) * perPage,
          previousPage: page === 1
            ? null
            : getPagePath(collection, page - 1),
          nextPage: page === totalPages
            ? null
            : getPagePath(collection, page + 1)
        }
      });
    });
  });
};

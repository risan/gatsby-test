const path = require("path");
const _ = require("lodash");
const config = require("../gatsby-config").siteMetadata.markdownCollection;

const DEFAULT_PER_PAGE = 10;

const has = (collection, key) =>
  _.has(config, `collections.${collection}.${key}`);

const get = (collection, key, defaultValue = null) =>
  _.get(config, `collections.${collection}.${key}`, defaultValue);

/**
 * Get per page setting for the given collection.
 *
 * @param {String} collection
 * @return {Number}
 */
const getPerPage = collection => {
  const perPage = get(collection, "perPage")

  if (perPage) {
    return perPage;
  }

  return _.has(config, "perPage") ? config.perPage : DEFAULT_PER_PAGE;
};

/**
 * Get base path for the given collection.
 *
 * @param {String} collection
 * @return {String}
 */
const getBasePath = collection => {
  const path = get(collection, "path");

  if ("/" === path) {
    return path;
  }

  const LEADING_AND_TRAILING_SLASHES_PATTERN = /^\/|\/$/g;
  const normalizedPath = path.replace(LEADING_AND_TRAILING_SLASHES_PATTERN, '');

  return `/${normalizedPath}/`;
};

/**
 * Get page path for the given collection.
 *
 * @param {String} collection
 * @param {Number} page
 * @return {String}
 */
const getPagePath = (collection, page) => {
  const basePath = getBasePath(collection);

  return page === 1 ? basePath : `${basePath}${page}/`;
};

/**
 * Get template for the given collection.
 *
 * @param {String} collection
 * @return {String}
 */
const getTemplate = collection => {
  const template = get(collection, "listTemplate");

  if (template) {
    return path.resolve(template);
  }

  if (!config.hasOwnProperty("listTemplate")) {
    throw new Error(`The [markdownCollection.listTemplate] property is missing and no [listTemplate] set for [${collection}].`)
  }

  return path.resolve(config.listTemplate);
};

module.exports = {
  getPerPage,
  getPagePath,
  getTemplate
};

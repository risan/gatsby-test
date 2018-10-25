const path = require("path");
const _ = require("lodash");
const siteConfig = require("../gatsby-config").siteMetadata;
const config = siteConfig.markdownCollection;
const resolveTemplate = require("./resolve-template");

const DEFAULT_PER_PAGE = 10;

const has = (collection, key) =>
  _.has(config, `collections.${collection}.${key}`);

const get = (collection, key, defaultValue = null) =>
  _.get(config, `collections.${collection}.${key}`, defaultValue);

/**
 * Get the collection's config.
 *
 * @param {String} collection
 * @return {Object}
 */
const getConfig = collection => ({
  ...config.collections[collection],
  path: getPath(collection),
  perPage: getPerPage(collection),
  listTemplate: getListTemplate(collection),
  template: getTemplate(collection),
  image: getImage(collection)
});

/**
 * Map collection's config for page context.
 *
 * Namespacing it with "config" so it won't override any other context data.
 *
 * @param {String} collection
 * @return {Object}
 */
const mapConfigForContext = collection => _.mapKeys(getConfig(collection),
  (value, key) => _.camelCase(`config_${key}`)
);

/**
 * Get the path for the given collection.
 *
 * @param {String} collection
 * @return {String}
 */
const getPath = collection => {
  const basePath = get(collection, "path");

  if ("/" === basePath) {
    return basePath;
  }

  const LEADING_AND_TRAILING_SLASHES_PATTERN = /^\/|\/$/g;

  return `/${basePath.replace(LEADING_AND_TRAILING_SLASHES_PATTERN, '')}`;
};

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

  return config.hasOwnProperty("perPage") ? config.perPage : DEFAULT_PER_PAGE;
};

/**
 * Get list template for the given collection.
 *
 * @param {String} collection
 * @return {String}
 */
const getListTemplate = collection => {
  const template = get(collection, "listTemplate");

  if (template) {
    return resolveTemplate(template);
  }

  if (config.hasOwnProperty("listTemplate")) {
    return resolveTemplate(config.listTemplate);
  }

  throw new Error(`The [${collection}.listTemplate] property is missing and the default [markdownCollection.listTemplate] property is not set.`);
};

/**
 * Get page path for the given collection.
 *
 * @param {String} collection
 * @param {Number} page
 * @return {String}
 */
const getPagePath = (collection, page) => {
  let path = getPath(collection);

  const basePath = path === "/" ? path : `${path}/`;

  return page === 1 ? basePath : `${basePath}${page}/`;
};

/**
 * Get collection template.
 *
 * @param {String} collection
 * @return {String}
 */
const getTemplate = collection => {
  const template = get(collection, "template");

  if (template) {
    return resolveTemplate(template);
  }

  if (config.hasOwnProperty("template")) {
    return resolveTemplate(config.template);
  }

  if (siteConfig.hasOwnProperty("markdownTemplate")) {
    return resolveTemplate(siteConfig.markdownTemplate);
  }

  throw new Error(`The [${collection}.template] property is missing. No default [markdownCollection.template] or [siteMetadata.markdownTemplate] are set.`);
};

/**
 * Get the collection's image.
 *
 * @param {String} collection
 * @return {String}
 */
const getImage = collection => {
  const image = get(collection, "image");

  if (image) {
    return path.resolve(image);
  }

  if (config.hasOwnProperty("image")) {
    return path.resolve(config.image);
  }

  if (siteConfig.hasOwnProperty("markdownImage")) {
    return path.resolve(siteConfig.markdownImage);
  }

  throw new Error(`The [${collection}.image] property is missing. No default [markdownCollection.image] or [siteMetadata.markdownImage] are set.`);
};

module.exports = {
  getConfig,
  mapConfigForContext,
  getPath,
  getPerPage,
  getListTemplate,
  getPagePath,
  getTemplate,
  getImage
};

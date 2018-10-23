const config = require("../config");

/**
 * Get the formatted collections data.
 *
 * - Add "name" property
 * - Normalize the path:
 *   1. Remove the leading and trailing slashes
 *   2. Escape the remaining slashes
 *
 * @return {Object}
 */
const getFormattedCollections = () => {
  const collections = Object.assign({}, config.collections);
  const formatted = {};

  const LEADING_AND_TRAILING_SLASHES_PATTERN = /^\/|\/$/g;

  for (const name in config.collections) {
    formatted[name] = { ...config.collections[name], name };

    if (name === "root") {
      formatted[name].path = "/";
      formatted[name].normalizedPath = "/";
    } else {
      formatted[name].normalizedPath = config.collections[name].path
        .replace(LEADING_AND_TRAILING_SLASHES_PATTERN, '')
        .replace(/\//g, '\\/');
    }
  }

  return formatted;
};

/**
 * Key collections by the normalized path.
 *
 * @param {Object} collections
 * @return {Object}
 */
const keyByNormalizedPath = collections => {
  const keyed = {};

  for (const name in collections) {
    keyed[collections[name].normalizedPath] = { ...collections[name] };
  }

  return keyed;
};

const collections = getFormattedCollections();

const useRootCollection = collections.hasOwnProperty("root");

const collectionsByPath = keyByNormalizedPath(collections);

const normalizedCollectionPaths = Object.values(collections)
  .filter(collection => collection.name !== "root")
  .map(collection => collection.normalizedPath);

const COLLECTION_PATHS_PATTERNS = new RegExp(
  `^\/(${normalizedCollectionPaths.join('|')})\/`
);

const ROOT_PATTERN = /^\/[\w-]+\/$/;

/**
 * Get collection name for the given slug.
 *
 * @param {String} slug
 * @return {String|Null}
 */
const getCollectionName = slug => {
  const matches = slug.match(COLLECTION_PATHS_PATTERNS);

  if (!Array.isArray(matches) || matches.length < 2) {
    if (!useRootCollection) {
      return null;
    }

    return ROOT_PATTERN.test(slug) ? "root" : null;
  }

  return collectionsByPath[matches[1]].name;
};

module.exports = {
  getCollectionName
};

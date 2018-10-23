const _ = require("lodash");
const config = require("../gatsby-config").siteMetadata.markdownCollection;
const collectionData = config.collections;

const SLASHES_PATTERN = /\//g;
const LEADING_SLASH_PATTERN = /^\//;
const LEADING_AND_TRAILING_SLASHES_PATTERN = /^\/|\/$/g;

// Get the root collection data.
const rootKey = _.findKey(collectionData, { path: "/" });
const rootCollection = rootKey ? collectionData[rootKey] : null;

// The collection array with a normalized path.
const collections = _.map(collectionData, (item, name) => {
  if (!item.hasOwnProperty("path")) {
    throw new Error(`The "path" property is missing for collection: ${name}.`);
  }

  return {
    name,
    path: item.path === "/"
      ? "/"
      : item.path.replace(LEADING_AND_TRAILING_SLASHES_PATTERN, '')
  }
});

// Collection keyed by path.
const collectionsByPath = _.keyBy(collections, "path");

// The collection paths pattern string: "posts|tutorials\/js|tips"
// The root path is excluded.
const collectionPathsStr = collections.filter(({ path}) => path !== "/")
  .map(({ path }) => path.replace(SLASHES_PATTERN, '\\/'))
  .join("|");

/**
 * The collection path regex.
 *
 * If you set the collections paths to: "/", "posts", and "tutorials/js"
 * It'll match the following files
 * - projects/index.md
 * - projects.md
 * - posts/new-blog/index.md
 * - posts/new-blog.md
 * - tutorials/js/learn-es2015/index.md
 * - tutorials/js/learn-es2015.markdown
 */
const occurrencesPattern = rootKey ? "{0,1}"  : "";

const COLLECTION_PATH_PATTERN = new RegExp(
  `^((${collectionPathsStr})/)${occurrencesPattern}[\\w-]+(/index)?\\.(md|markdown)$`, 'i'
);

/**
 * Get collection name for the given relative path.
 *
 * @param {String} relativePath
 * @return {String|Null}
 */
module.exports = relativePath => {
  const path = relativePath.replace(LEADING_SLASH_PATTERN, '');

  const matches = path.match(COLLECTION_PATH_PATTERN);

  if (!matches) {
    return null;
  }

  const matchedPath = matches[2] ? matches[2] : "/";

  return collectionsByPath[matchedPath].name;
};

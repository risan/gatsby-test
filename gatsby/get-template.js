const path = require("path");
const _ = require("lodash");
const config = require("../gatsby-config").siteMetadata;

const defaultTemplate = config.hasOwnProperty("defaultMarkdownTemplate")
  ? path.resolve(config.defaultMarkdownTemplate)
  : null;

const defaultCollectionTemplate = _.has(config, "markdownCollection.template")
  ? path.resolve(config.markdownCollection.template)
  : defaultTemplate;

/**
 * Get page template.
 *
 * @param {String|Null} collection
 * @return {String}
 */
module.exports = collection => {
  if (null === defaultTemplate) {
    throw new Error("The [siteMetadata.defaultMarkdownTemplate] property is missing.")
  }

  if (!collection) {
    return defaultTemplate;
  }

  return _.has(config, `markdownCollection.collections.${collection}.template`)
    ? path.resolve(config.markdownCollection.collections[collection].template)
    : defaultCollectionTemplate;
};

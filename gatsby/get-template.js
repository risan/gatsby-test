const _ = require("lodash");
const config = require("../gatsby-config").siteMetadata;
const { getTemplate } = require("./collection-config");

const LEADING_SLASH = /^\//;

const defaultTemplate = config.hasOwnProperty("defaultMarkdownTemplate")
  ? config.defaultMarkdownTemplate.replace(LEADING_SLASH, '')
  : null;

/**
 * Get page template.
 *
 * @param {String|Null} collection
 * @return {String}
 */
module.exports = collection => {
  if (collection) {
    return getTemplate(collection);
  }

  if (null === defaultTemplate) {
    throw new Error("The [siteMetadata.defaultMarkdownTemplate] property is missing.")
  }

  return defaultTemplate;
};

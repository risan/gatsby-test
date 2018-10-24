const path = require("path");
const config = require("../gatsby-config").siteMetadata;

const LEADING_SLASH = /^\//;
const TRAILING_SLASH = /\/$/;

const templateDir = config.hasOwnProperty("templateDir")
  ? config.templateDir.replace(TRAILING_SLASH, '')
  : "src/templates";

/**
 * Resolve the given template filename.
 *
 * @param {String} filename
 * @return {String}
 */
module.exports = filename => path.resolve(
  templateDir,
  filename.replace(LEADING_SLASH, '')
);

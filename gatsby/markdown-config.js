const path = require("path");
const _ = require("lodash");
const config = require("../gatsby-config").siteMetadata;
const resolveTemplate = require("./resolve-template");
const {
  getTemplate: getCollectionTemplate,
  getImage: getCollectionImage
} = require("./markdown-collection-config");

/**
 * Get the default template.
 *
 * @return {String|Null}
 */
const getDefaultTemplate = () => config.hasOwnProperty("markdownTemplate")
  ? resolveTemplate(config.markdownTemplate)
  : null;

/**
 * Get template for the given collection.
 *
 * @param {String|Null} collection
 * @return {String}
 */
const getTemplate = (collection = null) => {
  if (collection) {
    return getCollectionTemplate(collection);
  }

  const template = getDefaultTemplate();

  if (null === template) {
    throw new Error("The [siteMetadata.markdownTemplate] property is missing.")
  }

  return template;
};

/**
 * Get the default image.
 *
 * @return {String|Null}
 */
const getDefaultImage = () => config.hasOwnProperty("markdownImage")
  ? path.resolve(config.markdownImage)
  : null;

/**
 * Get image for the given collection.
 *
 * @param {String|Null} collection
 * @return {String}
 */
const getImage = (collection = null) => {
  if (collection) {
    return getCollectionImage(collection);
  }

  const image = getDefaultImage();

  if (null === image) {
    throw new Error("The [siteMetadata.markdownImage] property is missing.")
  }

  return image;
};

module.exports = {
  getTemplate,
  getDefaultTemplate,
  getDefaultImage,
  getImage
};

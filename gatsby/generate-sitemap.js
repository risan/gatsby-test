const fs = require('fs');
const path = require("path");
const util = require('util');
const mm = require("micromatch");
const sitemap = require("sitemap");

const writeFile = util.promisify(fs.writeFile);

const TRAILING_SLASH = /\/$/;

/**
 * Get markdown pages data.
 *
 * @param {Array} edges
 * @return {Array}
 */
const getMarkdownPages = edges => edges.map(({ node }) => {
  const item = {
    url: node.fields.slug,
    lastmodISO: node.frontmatter.lastUpdate
      ? node.frontmatter.lastUpdate
      : node.frontmatter.date
  };

  if (node.frontmatter.image) {
    item.img = node.frontmatter.image.publicURL;
  }

  return item;
});

/**
 * Get the js pages data.
 *
 * @param {Array} edges
 * @param {Array} markdownPagePaths)
 * @return {Arrat}
 */
const getJsPages = (edges, markdownPagePaths) => edges.map(({ node }) => ({
  url: node.path
})).filter(page => !markdownPagePaths.includes(page.url));

/**
 * Get pages data.
 *
 * @param {Object} data
 * @return {Array}
 */
const getPages = data => {
  const markdownPages = getMarkdownPages(data.allMarkdownRemark.edges);

  const markdownPagePaths = markdownPages.map(page => page.url);

  const jsPages = getJsPages(data.allSitePage.edges, markdownPagePaths);

  return [...markdownPages, ...jsPages];
};

module.exports = async (data, pathPrefix) => {
  const prefix = pathPrefix
    ? pathPrefix === "/" ? "" : pathPrefix
    : "";

  const baseUrl = data.site.siteMetadata.siteUrl.replace(TRAILING_SLASH, '') + prefix;

  const pages = getPages(data).map(page => {
    if (mm.any(page.url, data.site.siteMetadata.sitemap.excludePaths)) {
      return null;
    }

    const priority = mm.any(
      page.url, data.site.siteMetadata.sitemap.importantPaths
    ) ? 0.7 : 0.5;

    const item = {
      ...page,
      priority,
      changefreq: "weekly"
    };

    item.url = item.url === "/" ? baseUrl : baseUrl + item.url;

    if (item.hasOwnProperty("img")) {
      item.img = baseUrl + item.img;
    }

    return item;
  }).filter(Boolean);

  const map = sitemap.createSitemap({ urls: pages });

  await writeFile(path.resolve("./public/sitemap.xml"), map.toString());
};

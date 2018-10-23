const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const config = require("../config");
const { getCollectionName } = require("./collections");

const isMarkdown = node => node.internal.type === "MarkdownRemark";

module.exports = ({ getNode, node, actions }) => {
  if (!isMarkdown(node)) {
    return;
  }

  const { createNodeField } = actions;
  const slug = createFilePath({ node, getNode });

  createNodeField({
    node,
    name: "slug",
    value: slug
  });

  const fileNode = getNode(node.parent);

  createNodeField({
    node,
    name: "image",
    value: node.frontmatter.image
      ? node.frontmatter.image
      : path.relative(fileNode.dir, path.resolve(config.defaultFeaturedImage))
  });

  createNodeField({
    node,
    name: "collection",
    value: getCollectionName(slug)
  });
};

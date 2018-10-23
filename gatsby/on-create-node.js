const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const config = require("../gatsby-config").siteMetadata;
const getCollectionName = require("./get-markdown-collection-name");

const isMarkdown = node => node.internal.type === "MarkdownRemark";

module.exports = ({ getNode, node, actions }) => {
  if (!isMarkdown(node)) {
    return;
  }

  const { createNodeField } = actions;
  const fileNode = getNode(node.parent);

  createNodeField({
    node,
    name: "slug",
    value: createFilePath({ node, getNode })
  });

  createNodeField({
    node,
    name: "author",
    value: node.frontmatter.author ? node.frontmatter.author : config.author
  });

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
    value: getCollectionName(fileNode.relativePath)
  });
};

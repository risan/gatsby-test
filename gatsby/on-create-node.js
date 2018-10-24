const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const config = require("../gatsby-config").siteMetadata;
const getCollectionName = require("./get-markdown-collection-name");
const getTemplate = require("./get-template");

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

  const collection = node.frontmatter.page
    ? null
    : getCollectionName(fileNode.relativePath);

  createNodeField({
    node,
    name: "collection",
    value: collection
  });

  createNodeField({
    node,
    name: "template",
    value: node.frontmatter.template
      ? node.frontmatter.template
      : getTemplate(collection)
  });
};

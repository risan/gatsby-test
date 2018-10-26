const onCreateNode = require("./gatsby/on-create-node");
const createPages = require("./gatsby/create-pages");
const onPostBuild = require("./gatsby/on-post-build");

module.exports = {
  onCreateNode,
  createPages,
  onPostBuild
};

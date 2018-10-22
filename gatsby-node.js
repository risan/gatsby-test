const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const isMarkdown = node => node.internal.type === "MarkdownRemark";

exports.onCreateNode = ({ getNode, node, actions }) => {
  if (isMarkdown(node)) {
    const { createNodeField } = actions;

    createNodeField({
      node,
      name: "slug",
      value: createFilePath({ node, getNode })
    });

    let image = node.frontmatter.image;

    if (! image) {
      const fileNode = getNode(node.parent);

      image = path.relative(
        fileNode.dir,
        "./src/pages/images/default-featured.jpg"
      );
    }

    createNodeField({
      node,
      name: "image",
      value: image
    });
  }
};

exports.createPages = ({ graphql, actions: { createPage } }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `);

      const component = path.resolve("./src/templates/post.js");

      data.allMarkdownRemark.edges.forEach(({ node }) => createPage({
        path: node.fields.slug,
        component,
        context: {
          slug: node.fields.slug
        }
      }));

      const posts = data.allMarkdownRemark.edges.filter(({ node }) =>
        /^\/posts\//.test(node.fields.slug)
      );

      const perPage = 5;
      const totalPages = Math.ceil(posts.length / perPage);

      const getPagePath = page => page === 1
        ? "/posts"
        : `/posts/${page}`;

      for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        createPage({
          path: getPagePath(currentPage),
          component: path.resolve("./src/templates/post-list.js"),
          context: {
            limit: perPage,
            skip: (currentPage - 1) * perPage,
            previousPage: currentPage === 1
              ? null
              : getPagePath(currentPage - 1) + '/',
            nextPage: currentPage === totalPages
              ? null
              : getPagePath(currentPage + 1) + '/'
          }
        });
      }

      resolve();
    } catch(error) {
      reject(error);
    }
  });

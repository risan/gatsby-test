const path = require("path");
const config = require("../config");

const defaultTemplate = path.resolve(config.defaultTemplate);
const defaultListTemplate = path.resolve(config.defaultListTemplate);

const getTemplateFor = name => {
  if (!name) {
    return defaultTemplate;
  }

  return config.collections[name].hasOwnProperty("template")
    ? path.resolve(config.collections[name].template)
    : defaultTemplate;
};

const getListTemplateFor = name =>
  config.collections[name].hasOwnProperty("listTemplate")
    ? path.resolve(config.collections[name].listTemplate)
    : defaultListTemplate;

const getPerPageFor = name =>
  config.collections[name].hasOwnProperty("perPage")
    ? config.collections[name].perPage
    : config.defaultPerPage;

const getBasePathFor = name => {
  if ("root" === name) {
    return "/";
  }

  const basePath = config.collections[name].path.replace(/^\/|\/$/g, '');

  return `/${basePath}/`;
};

const getPagePathFor = (name, page) => {
  const basePath = getBasePathFor(name);

  return page === 1 ? basePath : `${basePath}${page}/`;
};

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              collection
            }
          }
        }
      }
    }
  `);

  const collectionsCount = {};

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: getTemplateFor(node.fields.collection),
      context: {
        slug: node.fields.slug
      }
    });

    const name = node.fields.collection;

    if (!name) {
      return;
    }

    collectionsCount[name] = collectionsCount.hasOwnProperty(name)
      ? collectionsCount[name] + 1
      : 1;
  });

  for (collection in collectionsCount) {
    const total = collectionsCount[collection];

    const perPage = getPerPageFor(collection);
    const totalPages = Math.ceil(total / perPage);

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      createPage({
        path: getPagePathFor(collection, currentPage),
        component: getListTemplateFor(collection),
        context: {
          collection: collection,
          limit: perPage,
          skip: (currentPage - 1) * perPage,
          previousPage: currentPage === 1
            ? null
            : getPagePathFor(collection, currentPage - 1),
          nextPage: currentPage === totalPages
            ? null
            : getPagePathFor(collection, currentPage + 1)
        }
      });
    }
  }
}

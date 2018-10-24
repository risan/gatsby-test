module.exports = {
  siteMetadata: {
    url: "https://risanbagja.com",
    title: "Risan Bagja's Blog",
    headerTitle: "Risan Bagja",
    headerDescription: "A journal of a passionate coder",
    author: "Risan Bagja",
    defaultImage: "images/default-featured.jpg",
    defaultMarkdownTemplate: "post.js",
    twitter: "@risanbagja",
    publisherLogo: "https://avatars2.githubusercontent.com/u/3825242",
    markdownCollection: {
      template: "post.js",
      listTemplate: "post-list.js",
      perPage: 10,
      collections: {
        posts: {
          path: "posts",
          defaultImage: "images/default-featured.jpg",
          thumbWidth: 400,
          thumbHeight: 250
        },
        logs: {
          path: "logs",
          listTemplate: "log-list.js"
        }
      }
    }
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "src/pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "content"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // Must be placed before prismjs plugin
          "gatsby-remark-autolink-headers",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 652
            }
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true
            }
          }
        ]
      }
    },
    "gatsby-transformer-sharp"
  ]
};

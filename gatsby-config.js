module.exports = {
  siteMetadata: {
    url: "https://risanbagja.com",
    lang: "en",
    title: "Risan Bagja's Blog",
    description: "Programming journal of Risan Bagja Pradana. A passionate coder who writes codes for fun. Seriously.",
    headerTitle: "Risan Bagja",
    headerDescription: "A journal of a passionate coder",
    author: "Risan Bagja",

    markdownTemplate: "post.js",
    markdownImage: "content/images/default-featured.jpg",
    markdownCollection: {
      listTemplate: "collection-list.js",
      perPage: 10,
      collections: {
        posts: {
          path: "posts",
          listTemplate: "post-list.js",
        },
        tips: {
          path: "tips",
          title: "Programming Tips and Notes"
        }
      }
    },

    seo: {
      fbAppId: false,
      locale: "en_US",
      twitterCreator: "@risanbagja",
      twitterSite: false,
      publisherName: "Risan Bagja",
      publisherLogo: "https://avatars2.githubusercontent.com/u/3825242"
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

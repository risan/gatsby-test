module.exports = {
  siteMetadata: {
    siteUrl: "https://risanbagja.com",
    lang: "en",
    title: "Risan Bagja's Blog",
    description: "Programming journal of Risan Bagja Pradana. A passionate coder who writes codes for fun. Seriously.",
    headerTitle: "Risan Bagja",
    headerDescription: "Journal of a passionate coder",
    author: "Risan Bagja",

    markdownTemplate: "post.js",
    markdownImage: "content/images/default-featured.jpg",
    markdownCollection: {
      listTemplate: "collection.js",
      perPage: 10,
      collections: {
        posts: {
          path: "posts",
          listTemplate: "post-collection.js",
          title: "Programming Articles and Tutorials"
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
    },

    sitemap: {
      importantPaths: ["/", "/about/"],
      excludePaths:[
        "/dev-404-page/",
        "/offline-plugin-app-shell-fallback/",
        "/posts/",
        "/posts/[0-9]+/",
        "/tips/",
        "/tips/[0-9]+/"
      ]
    }
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Risan Bagja",
        short_name: "Risan Bagja",
        start_url: "/",
        background_color: "#e5e5de",
        theme_color: "#3b3b3b",
        display: "minimal-ui",
        icon: "content/images/icon.png"
      }
    },
    "gatsby-plugin-offline", // Place it after "gatsby-plugin-manifest"
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

import React from "react";
import { graphql, Link } from "gatsby";
import Container from "../components/container";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import PostLinkCollection from "../components/post-link-collection";
import PostLinkWithImageCollection from "../components/post-link-with-image-collection";
import Seo from "../components/seo";
import logo from "./logo.png";
import styles from "./index.module.css";

export default ({ data }) => (
  <div className={styles.layout}>
    <Seo
      path="/"
      title={data.site.siteMetadata.title}
      concatenateSiteTitle={false}
      useStructuredData={false}
    />

    <header className={styles.header}>
      <Container>
        <img
          src={logo}
          className={styles.logo}
          alt="May The Force by Katerina Limpitsoun"
        />
      </Container>
    </header>

    <Navbar showHome={false} centerAlign={true} />

    <section>
      <Container>
        <div className={styles.about}>
          <h1>{data.site.siteMetadata.headerTitle}</h1>
          <p>
            Hi, welcome to my blog! My name is Risan Bagja Pradana. I code for
            fun, seriously. I enjoy spending time writing clean and
            maintainable code. This blog serves as a journal to document things
            I learn as an avid programmer. Here you'll find articles, tutorials,
            and some quick tips about programming.
          </p>
        </div>
      </Container>
    </section>

    <section>
      <Container>
        <h2>Latest Posts</h2>
        <PostLinkWithImageCollection items={data.posts.edges} />
        <div className={styles.seeAllContainer}>
          <Link to="/posts/">See All Posts &rarr;</Link>
        </div>
      </Container>
    </section>

    <section>
      <Container>
        <h2>Latest Tips</h2>
        <PostLinkCollection items={data.tips.edges} />
        <div className={styles.seeAllContainer}>
          <Link to="/tips/">See All Tips &rarr;</Link>
        </div>
      </Container>
    </section>

    <Footer />
  </div>
);

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        headerTitle
        headerDescription
      }
    },
    posts: allMarkdownRemark(
      filter: {
        fields: {
          collection: { eq: "posts" }
        }
      }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          fields {
            slug
            image {
              childImageSharp {
                featuredThumb: resize(
                  width: 400
                  height: 250
                  cropFocus: CENTER
                ) {
                  src
                }
              }
            }
          }
          frontmatter {
            title
            date
            displayDate: date(formatString: "DD MMMM YYYY")
            excerpt
          }
          excerpt(
            pruneLength: 120
            truncate: false
          )
        }
      }
    }
    tips: allMarkdownRemark(
      filter: {
        fields: {
          collection: {
            eq: "tips"
          }
        }
      }
      sort: {
        fields: frontmatter___date
        order: DESC
      }
      limit: 5
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            datePretty: date(formatString: "DD MMM YYYY")
          }
        }
      }
    }
  }
`;

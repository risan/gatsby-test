import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import Container from "./container";
import styles from "./header.module.css";

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            headerTitle
            headerDescription
          }
        }
      }
    `}
    render={data => (
      <header className={styles.header}>
        <Container>
          <Link to="/">
            <h1 className={styles.title}>
              {data.site.siteMetadata.headerTitle}
            </h1>
          </Link>
          <h2 className={styles.description}>
            {data.site.siteMetadata.headerDescription}
          </h2>
        </Container>
      </header>
    )}
  />
);

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
            <p className={styles.title}>
              {data.site.siteMetadata.headerTitle}
            </p>
          </Link>
          <p className={styles.description}>
            {data.site.siteMetadata.headerDescription}
          </p>
        </Container>
      </header>
    )}
  />
);

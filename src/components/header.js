import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import Container from "./container";

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <header>
        <Container>
          <Link to="/">
            <h1>{data.site.siteMetadata.title}</h1>
          </Link>
        </Container>
      </header>
    )}
  />
);

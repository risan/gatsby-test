import React from "react";
import Container from "./container";
import styles from "./footer.module.css";

export default () => (
  <footer className={styles.footer}>
    <Container>
      <p>
        Except where otherwise noted, content on this blog is licensed under a
        Creative Commons Attribution 4.0 International License.
      </p>
    </Container>
  </footer>
);

import React from "react";
import { Link } from "gatsby";
import Container from "./container";
import styles from "./navbar.module.css";

export default () => (
  <nav>
    <Container>
      <ul className={styles.menu}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </Container>
  </nav>
);

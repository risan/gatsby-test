import React from "react";
import { Link } from "gatsby";
import Container from "./container";
import styles from "./navbar.module.css";

export default ({ showHome = true, centerAlign= false }) => (
  <nav className={styles.navbar}>
    <Container>
      <ul
        className={styles.menu}
        style={{ justifyContent: centerAlign ? 'center' : 'initial' }}
      >
        {showHome &&
          <li>
            <Link to="/">Home</Link>
          </li>
        }
        <li>
          <Link to="/posts/">Posts</Link>
        </li>
        <li>
          <Link to="/tips/">Tips</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
      </ul>
    </Container>
  </nav>
);

import React from "react";
import { Link } from "gatsby";
import styles from "./pagination.module.css";

export default ({ previousPage, nextPage }) => (
  <nav className={styles.pagination}>
    {previousPage &&
      <Link to={previousPage}>&larr; Newer Posts</Link>
    }
    {nextPage &&
      <Link to={nextPage}>Older Posts &rarr;</Link>
    }
  </nav>
);

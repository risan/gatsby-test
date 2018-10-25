import React from "react";
import { Link } from "gatsby";
import styles from "./post-link-collection.module.css";

export default ({ items }) => (
  <ul className={styles.list}>
    {items.map(({ node }) => (
      <li key={node.id} className={styles.item}>
        <Link to={node.fields.slug} className={styles.link}>
          {node.frontmatter.title}
        </Link>
        <span className={styles.date}>
          {node.frontmatter.datePretty}
        </span>
      </li>
    ))}
  </ul>
);

import React from "react";
import { Link } from "gatsby";
import styles from "./post-link.module.css";

export default ({ path, image, title, excerpt, date }) => (
  <Link to={path} className={styles.link}>
    <article className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <time className={styles.time}>{date}</time>
      </div>
    </article>
  </Link>
);

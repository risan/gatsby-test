import React from "react";
import { Link } from "gatsby";
import styles from "./post-link-with-image.module.css";

export default ({ path, image, title, excerpt, date, displayDate }) => (
  <Link to={path} className={styles.link}>
    <article className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <time
          className={styles.date}
          dateTime={date}
          pubdate="true"
        >
          {displayDate}
        </time>
      </div>
    </article>
  </Link>
);

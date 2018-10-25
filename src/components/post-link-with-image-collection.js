import React from "react";
import PostLinkWithImage from "./post-link-with-image";

export default ({ items }) => (
  <div style={{ marginBottom: "1.5rem" }}>
    {items.map(({ node }) => (
      <PostLinkWithImage
        key={node.id}
        path={node.fields.slug}
        image={node.fields.image.childImageSharp.featuredThumb.src}
        title={node.frontmatter.title}
        excerpt={node.frontmatter.excerpt
          ? node.frontmatter.excerpt
          : node.excerpt}
        date={node.frontmatter.date}
        displayDate={node.frontmatter.displayDate}
      />
    ))}
  </div>
);

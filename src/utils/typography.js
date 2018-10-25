import Typography from "typography";
import bootstrapTheme from "typography-theme-bootstrap";

bootstrapTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  "h1,h2,h3,h4,h5,h6": {
    fontWeight: 600,
    marginTop: rhythm(2/3),
    marginBottom: rhythm(1/3)
  },
  a: {
    color: "#6241c5",
    textDecoration: "none"
  },
  "a:hover": {
    color: "#bf3599"
  },
  "li li, li > p:first-child": {
    marginBottom: rhythm(1/4)
  },
  "li > ul, li > ol, li > ul:last-child, li > ol:last-child": {
    marginTop: 0,
    marginBottom: rhythm(1/2)
  }
});

const typography = new Typography(bootstrapTheme);

export default typography;

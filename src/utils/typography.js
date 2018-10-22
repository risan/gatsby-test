import Typography from "typography";
import bootstrapTheme from "typography-theme-bootstrap";

bootstrapTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  "h1,h2,h3,h4,h5,h6": {
    fontWeight: 600,
    marginTop: rhythm(2/3),
    marginBottom: rhythm(1/3)
  },
  a: {
    color: "#3935bf",
    textDecoration: "none"
  },
  "a:hover": {
    color: "#bf3599"
  }
});

const typography = new Typography(bootstrapTheme);

export default typography;

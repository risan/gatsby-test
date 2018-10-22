import Typography from "typography";
import bootstrapTheme from "typography-theme-bootstrap";

//bootstrapTheme.baseFontSize = "17px";
//bootstrapTheme.baseLineHeight = 1.6;

bootstrapTheme.overrideThemeStyles = ({ rhythm }, options) => ({
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

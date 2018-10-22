import Typography from "typography";
import bootstrapTheme from "typography-theme-bootstrap";

bootstrapTheme.baseFontSize = "17px";
bootstrapTheme.baseLineHeight = 1.6;

const typography = new Typography(bootstrapTheme);

export default typography;

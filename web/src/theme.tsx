import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#00ffff",
    },
    secondary: {
      main: "#000000",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#151515",
    },
  },
});

export default theme;

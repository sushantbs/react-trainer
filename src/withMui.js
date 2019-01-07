import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import CssBaseline from "@material-ui/core/CssBaseline";

// A theme with custom primary and secondary color.
// It's optional.
const primaryLight = purple[300];
const theme = createMuiTheme({
  palette: {
    primary: {
      light: primaryLight,
      main: purple[500],
      dark: purple[700]
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    }
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiCardHeader: {
      root: {
        backgroundColor: primaryLight
      }
    },
    MuiCardContent: {
      root: {
        display: "flex",
        flexDirection: "column"
      }
    },
    MuiCardActions: {
      root: {
        justifyContent: "flex-end"
      }
    }
  },
  props: {}
});

function withRoot(Component) {
  return function(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  };
}

export default withRoot;

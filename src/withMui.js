import React, { useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { grey, green, indigo, orange } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

// A theme with custom primary and secondary color.
// It's optional.

const themeOptions = [
  {
    name: "pg",
    display: "Purple Green",
    theme: createMuiTheme({
      palette: {
        type: "dark",
        primary: {
          light: green[300],
          main: green[500],
          dark: green[700],
          contrastText: "#fff"
        },
        secondary: {
          light: grey[300],
          main: grey[500],
          dark: grey[700]
        },
        text: {
          primary: "#ffffff"
        },
        background: {
          paper: green[700],
          default: grey[500]
        }
      },
      typography: {
        useNextVariants: true
      }
    })
  },
  {
    name: "oi",
    display: "Orange Indigo",
    theme: createMuiTheme({
      palette: {
        primary: {
          light: orange[300],
          main: orange[500],
          dark: orange[700]
        },
        secondary: {
          light: indigo[300],
          main: indigo[500],
          dark: indigo[700]
        },
        text: {
          primary: "#ffffff"
        },
        background: {
          paper: orange[700],
          default: indigo[500]
        }
      },
      typography: {
        useNextVariants: true
      }
    })
  }
];

function MuiRoot(Component) {
  return function(props) {
    const [themeObj, setThemeObject] = useState(themeOptions[0]);

    const onThemeChange = name =>
      setThemeObject(themeOptions.find(t => t.name === name));

    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={themeObj.theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component
          {...props}
          themeOptions={themeOptions}
          onThemeChange={onThemeChange}
        />
      </MuiThemeProvider>
    );
  };
}

export default MuiRoot;

import React, { useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { indigo, orange } from "@material-ui/core/colors";
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
          main: "#4CB963",
          dark: "#34623F",
          contrastText: "#E9F2CB"
        },
        secondary: {
          main: "#2D3142",
          contrastText: "#E8E8ED"
        },
        text: {
          primary: "#E9F2CB",
          secondary: "#E8E8ED"
        },
        background: {
          paper: "#34623F",
          default: "#E8E8ED"
        }
      },
      typography: {
        useNextVariants: true
      },
      fontSizes: {
        small: "10px"
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
          main: "#2D3142",
          dark: orange[700]
        },
        secondary: {
          main: "#B0D7FF"
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

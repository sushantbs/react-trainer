import React, { useState } from "react";
import { withStyles } from "@material-ui/core";

import "./App.css";
import MuiRoot from "./withMui";

import { Register } from "./routes/register";

const styles = theme => {
  return {
    root: {
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column"
      }
    }
  };
};

function App(props) {
  const { classes } = props;
  const [accessKey, setAccessKey] = useState(null);

  const onRegister = accessKey => {
    setAccessKey(accessKey);
  };

  return (
    <div className={`App main-container ${classes.root}`}>
      {accessKey ? (
        <div> Access key: {accessKey} </div>
      ) : (
        <Register {...props} onRegister={onRegister} />
      )}
    </div>
  );
}

export default MuiRoot(withStyles(styles, { withTheme: true })(App));

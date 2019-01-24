import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MuiRoot from "./withMui";
import "./App.css";
import { withStyles } from "@material-ui/core";
import { Game } from "./routes/Game";
import Profile from "./Profile";
import ChoosePath from "./ChoosePath";
import { Register } from "./routes/Register";

const styles = theme => {
  return {
    root: {}
  };
};

const checkUserStatus = async setStatusCheckComplete => {
  let response = await fetch("/api/status", {
    credentials: "same-origin"
  });

  let json = await response.json();
  setStatusCheckComplete(true);
  if (!json.accessKey) {
    window.history.pushState(null, "", "/choose");
  } else {
    window.history.pushState(null, "", "/profile");
  }
};

function App() {
  let [player, setPlayer] = useState(null);
  let [statusCheckComplete, setStatusCheckComplete] = useState(false);

  useEffect(() => {
    if (!statusCheckComplete) {
      checkUserStatus(setStatusCheckComplete);
    }
  }, []);

  return (
    <BrowserRouter>
      {statusCheckComplete ? (
        <div className="main-container">
          <Route path="/profile" render={() => <Profile />} />
          <Route path="/game" render={() => <Game />} />
          <Route path="/choose" render={() => <Register />} />
        </div>
      ) : (
        <div> Checking user status </div>
      )}
    </BrowserRouter>
  );
}

export default withStyles(styles)(MuiRoot(App));

import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import MuiRoot from "./withMui";

import { Register } from "./routes/register";
import { Game } from "./routes/game";
import { Profile } from "./routes/profile";

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
  const [me, setMe] = useState({ id: null });
  const [gameState, setGameState] = useState(null);

  // This is are the ACTIONS you would typically perform on the "app state"
  const onRegister = accessKey => {
    setAccessKey(accessKey);
  };

  const onProfileUpdate = me => {
    setMe(me);
  };

  const onGameEnd = gameResult => {
    if (gameResult.completed) {
      // Do something here...
    }

    if (gameResult.theFoolWhoLeftMidway === me.id) {
      // Maybe dont let the player leave?
    }

    setAccessKey(null);
  };

  return (
    <div className={`App main-container ${classes.root}`}>
      {accessKey ? (
        <div>
          <Switch>
            <Route
              path="/profile"
              render={props => <Profile onProfileUpdate={onProfileUpdate} />}
            />
            <Route
              path="/game"
              render={props => <Game {...gameState} onGameEnd={onGameEnd} />}
            />
            <Route
              exact
              path="/"
              render={props => <Game {...gameState} onGameEnd={onGameEnd} />}
            />
            <Route component={() => <div>Why are you here</div>} />
          </Switch>
        </div>
      ) : (
        <Register {...props} onRegister={onRegister} />
      )}
    </div>
  );
}

export default MuiRoot(withStyles(styles, { withTheme: true })(App));

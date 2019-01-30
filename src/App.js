import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import MuiRoot from "./withMui";
import { withStyles } from "@material-ui/core";
import { Game } from "./routes/Game";
import Profile from "./routes/Profile";
import { Register } from "./routes/Register";
import io from "socket.io-client";

import "./App.css";

const styles = theme => {
  return {
    root: {}
  };
};

let socket = null;

const connectSocket = playerId => {
  socket = io("/", {
    path: "/api/socket"
  });

  socket.on("turn", () => {
    debugger;
  });
  socket.on("chat", () => {
    debugger;
  });
};

const checkUserStatus = async (setStatusCheckComplete, setRedirect) => {
  let response = await fetch("/api/status", {
    credentials: "same-origin"
  });

  let json = await response.json();

  setStatusCheckComplete(true);
  if (json.status === "guest") {
    setRedirect("/choose");
  } else if (!json.handle) {
    setRedirect("/profile");
  } else {
    setRedirect("/game/home");
  }
};

function App() {
  const [player, setPlayer] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [statusCheckComplete, setStatusCheckComplete] = useState(false);

  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [gameState, setGameState] = useState(null);

  const gameProps = {
    players,
    messages,
    gameState
  };

  useEffect(() => {
    if (!statusCheckComplete) {
      checkUserStatus(setStatusCheckComplete, setRedirect);
    }
  }, []);

  return (
    <BrowserRouter>
      {statusCheckComplete ? (
        <div className="main-container">
          <Route path="/profile" render={() => <Profile />} />
          <Route path="/game" render={() => <Game {...gameProps} />} />
          <Route path="/choose" render={() => <Register />} />
          {redirect ? <Redirect to={redirect} /> : null}
        </div>
      ) : (
        <div> Checking user status </div>
      )}
    </BrowserRouter>
  );
}

export default withStyles(styles)(MuiRoot(App));

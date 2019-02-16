import React, { useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";
import MuiRoot from "./withMui";
import { withStyles } from "@material-ui/core";
import { Register } from "./routes/register";
import { Game } from "./routes/game";
import Profile from "./routes/profile";
import io from "socket.io-client";

import "./App.css";

const styles = theme => {
  return {
    root: {}
  };
};

function App({ classes, history }) {
  const checkUserStatus = async () => {
    setAuthStatus("inprogress");
    let response = await fetch("/api/status", {
      credentials: "same-origin"
    });

    let json = await response.json();

    setAuthStatus("complete");
    if (json.status === "guest" || !json.accessKey) {
      history.push("/choose");
    } else if (!json.handle) {
      connectSocket();
      history.push("/profile");
    } else {
      const { handle, avatar, id } = json;
      setMe({ handle, avatar, id });
      connectSocket();
      // TODO: If user is on / then redirect to /game/home
    }
  };

  const connectSocket = playerId => {
    if (!socket) {
      const connect = io("/", {
        path: "/api/socket"
      });

      connect.on("turn", state => {
        setGameState(state);
      });

      connect.on("players", p => {
        setPlayers(p);
      });

      connect.on("message", message => {
        setNewMessage(message);
      });

      connect.on("connect", () => {
        setSocket(connect);
      });
    }
  };

  const [me, setMe] = useState(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  // const [isConnected, setIsConnected] = useState(false);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState(null);

  const onMessage = message => {
    if (socket) {
      socket.emit("message", message);
    }
  };

  const onLeave = async () => {
    const response = await fetch("/api/leave", {
      method: "POST",
      credentials: "same-origin"
    });

    const json = await response.json();

    if (json.success) {
      history.go(-history.length);
      history.push("/choose");
    }
  };

  const onRegister = () => {
    if (!socket) {
      connectSocket();
    }
  };

  const gameProps = {
    players,
    me,
    chatMessages,
    gameState,
    onMessage,
    onLeave
  };

  useEffect(() => {
    if (!authStatus) {
      checkUserStatus();
    }
  });

  useEffect(() => {
    if (newMessage) {
      setChatMessages([...chatMessages, newMessage]);
    }
  }, [newMessage]);

  return (
    <>
      {authStatus === "complete" ? (
        <div className="main-container">
          <Route path="/profile" render={props => <Profile {...props} />} />
          <Route path="/game" render={() => <Game {...gameProps} />} />
          <Route
            path="/choose"
            render={() => <Register onRegister={onRegister} />}
          />
        </div>
      ) : (
        <div> Checking user status </div>
      )}
    </>
  );
}

export default withStyles(styles)(MuiRoot(withRouter(App)));

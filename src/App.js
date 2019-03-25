import React, { useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";
import io from "socket.io-client";
import { withStyles } from "@material-ui/core";

import "./App.css";
import MuiRoot from "./withMui";

import { Register } from "./routes/register";
import { Game } from "./routes/game";
import Profile from "./routes/profile";

import { ThemePicker } from "./components/ThemePicker";
import webrtc from "./components/webrtc";

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
  const { history, onThemeChange, themeOptions, classes } = props;
  const checkUserStatus = async () => {
    setAuthStatus("inprogress");
    let response = await fetch("/api/status", {
      credentials: "same-origin"
    });

    const { status, accessKey, handle, avatar, id } = await response.json();

    if (id && handle && avatar) {
      setMe({ handle, avatar, id });
    }

    setAuthStatus("complete");

    if (status === "guest" || !accessKey) {
      history.push("/choose");
    } else {
      setAccessKey(accessKey);
      if (!handle) {
        connectSocket();
        history.push("/profile");
      } else {
        connectSocket();
      }
    }
  };

  const connectSocket = () => {
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
        // initWebRTC();
      });
    }
  };

  const [me, setMe] = useState(null);
  const [accessKey, setAccessKey] = useState(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [webrtcHandle, setWebRTCHandle] = useState(null);
  // const [isConnected, setIsConnected] = useState(false);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [rtcReady, setRTCReady] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [newRemoteStream, addNewRemoteStream] = useState(null);
  const [incomingRTCRequest, setIncomingRTCRequest] = useState(null);

  const onRegister = accessKey => {
    setAccessKey(accessKey);

    if (!socket) {
      connectSocket();
    }

    if (me) {
      history.push("/game/home");
    } else {
      history.push("/profile");
    }
  };

  const onProfileUpdate = me => {
    setMe(me);
    // initWebRTC();
  };

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
      setAccessKey(null);
      history.go(-history.length);
      history.push("/choose");
    }
  };

  const onCallPlayer = async playerId => {
    await webrtcHandle.call(playerId);
  };

  const onAnswerCall = async rtcRequest => {
    await webrtcHandle.answerCall(rtcRequest);
  };

  const onHangUp = () => {
    webrtcHandle.endCall();
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  useEffect(() => {
    if (newMessage) {
      setChatMessages([...chatMessages, newMessage]);
    }
  }, [newMessage]);

  useEffect(() => {
    if (
      newRemoteStream &&
      !remoteStreams.find(
        stream => stream.playerId === newRemoteStream.playerId
      )
    ) {
      setRemoteStreams([...remoteStreams, newRemoteStream]);
    }
  }, [newRemoteStream]);

  useEffect(() => {
    if (socket && me) {
      setWebRTCHandle(
        webrtc(socket, me, {
          setRTCReady,
          setLocalStream,
          setIncomingRTCRequest,
          addNewRemoteStream
        })
      );
    }
  }, [socket, me]);

  useEffect(() => {
    if (me && socket) {
      socket.emit("player", { ...me, rtcReady });
    }
  }, [rtcReady, me, socket]);

  const gameProps = {
    players,
    me,
    accessKey,
    chatMessages,
    gameState,
    onMessage,
    onLeave,
    onCallPlayer,
    onAnswerCall,
    onHangUp,
    rtcReady,
    localStream,
    remoteStreams,
    incomingRTCRequest
  };

  return (
    <>
      {authStatus === "complete" ? (
        <div className={`main-container ${classes.root}`}>
          <Route
            path="/profile"
            render={props => (
              <Profile {...props} onProfileUpdate={onProfileUpdate} />
            )}
          />
          <Route
            path="/game"
            render={props => <Game {...props} {...gameProps} />}
          />
          <Route
            path="/choose"
            render={props => <Register {...props} onRegister={onRegister} />}
          />
          <div className="theme-picker-container">
            <ThemePicker
              options={themeOptions}
              value={
                themeOptions.find(({ theme }) => theme === props.theme).name
              }
              onChange={e => onThemeChange(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div> Checking user status </div>
      )}
    </>
  );
}

export default MuiRoot(
  withRouter(withStyles(styles, { withTheme: true })(App))
);

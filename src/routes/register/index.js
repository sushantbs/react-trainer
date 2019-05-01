import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import "./index.css";

const style = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    },
    "justify-content": "center",
    "align-items": "stretch",
    "flex-grow": 1
  },
  section: {
    display: "flex",
    flexDirection: "column",
    "justify-content": "center",
    alignItems: "center",
    flexBasis: "50%",
    color: theme.palette.text.primary
  },
  join: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  create: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
});

const joinRoomRequest = async accessKey => {
  const response = await fetch("/api/join", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    credentials: "same-origin",
    body: JSON.stringify({ accessKey })
  });

  return await response.json();
};

const createRoomRequest = async type => {
  // return await new Promise(function(resolve, reject) {
  //   setTimeout(() => resolve({ accessKey: "ABCDE" }), 2000);
  // });
  const response = await fetch("/api/create", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    credentials: "same-origin",
    body: JSON.stringify({ type })
  });

  return await response.json();
};

export const Register = withStyles(style)(({ onRegister, classes }) => {
  const [accessKey, setAccessKey] = useState("");
  const [roomType, setRoomType] = useState("0");
  const [joining, setJoining] = useState(false);
  const [creating, setCreating] = useState(false);

  return (
    <div className={`register-container ${classes.root}`}>
      <div className={[classes.section, classes.join].join(" ")}>
        <header>Join an existing game</header>
        <input
          type="text"
          placeholder="Access Key"
          value={accessKey}
          onChange={e => setAccessKey(e.target.value)}
        />
        <input
          type="button"
          value={joining ? "Joining..." : "Join"}
          disabled={joining || creating || accessKey.length !== 5}
          onClick={async e => {
            setJoining(true);
            let response = await joinRoomRequest(accessKey);
            if (response.accessKey) {
              onRegister();
            }
          }}
        />
      </div>
      <div className={[classes.section, classes.create].join(" ")}>
        <header>Create a new game</header>
        <select value={roomType} onChange={e => setRoomType(e.target.value)}>
          <option value="0">Select a Room</option>
          <option value="1">Mafia</option>
          <option value="2">Poker</option>
          <option value="3">Menti</option>
        </select>
        <input
          type="button"
          value={creating ? "Creating..." : "Create"}
          disabled={joining || creating || Boolean(roomType === "0")}
          onClick={async e => {
            setCreating(true);
            let response = await createRoomRequest(roomType);
            if (response.accessKey) {
              onRegister(response.accessKey);
            }
          }}
        />
      </div>
    </div>
  );
});

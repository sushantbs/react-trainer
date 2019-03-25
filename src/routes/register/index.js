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
    backgroundColor: theme.palette.primary.light
  },
  create: {
    backgroundColor: theme.palette.secondary.light
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
  // const theme = useTheme();
  const [accessKey, setAccessKey] = useState("");
  const [roomType, setRoomType] = useState("0");

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
          value="Join"
          disabled={accessKey.length !== 5}
          onClick={async e => {
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
          <option value="1">Room Type 1</option>
          <option value="2">Room Type 2</option>
        </select>
        <input
          type="button"
          value="Create"
          disabled={!Boolean(roomType !== "0")}
          onClick={async e => {
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

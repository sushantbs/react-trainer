import React, { useState } from "react";
import "./index.css";

const joinRoomRequest = async accessKey => {
  const response = await fetch("/api/join", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    credentials: "same-origin",
    body: JSON.stringify({ accessKey })
  });

  const json = await response.json();
  debugger;
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

  const json = await response.json();
  debugger;
};

export const Register = () => {
  const [accessKey, setAccessKey] = useState("");
  const [roomType, setRoomType] = useState("");

  return (
    <div className="register-container">
      <div className="join-game">
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
          onClick={e => joinRoomRequest(accessKey)}
        />
      </div>
      <div className="create-game">
        <header>Create a new game</header>
        <select value={roomType} onChange={e => setRoomType(e.target.value)}>
          <option value="1">Room Type 1</option>
          <option value="2">Room Type 2</option>
        </select>
        <input
          type="button"
          value="Join"
          disabled={!Boolean(roomType)}
          onClick={e => createRoomRequest(roomType)}
        />
      </div>
    </div>
  );
};

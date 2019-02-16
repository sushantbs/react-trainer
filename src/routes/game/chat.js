import React, { useState, useEffect } from "react";
import { ArrowRightRounded } from "@material-ui/icons";
import "./index.css";

let playerMap;

export function Chat({ chatMessages, me, players, onMessage }) {
  const [message, setMessage] = useState("");
  const [statePlayers, setStatePlayers] = useState([]);

  useEffect(() => {
    if (players !== statePlayers) {
      setStatePlayers(players);
      playerMap = new Map();
      players.forEach(player => playerMap.set(player.id, player));
    }
  });

  return (
    <div className="tab-content-sleeve chat-room">
      <h2>Chat</h2>
      {chatMessages.map((message, index) =>
        message.author === me.id ? (
          <div className="my-message" key={index}>
            <img
              alt=""
              src={`https://api.adorable.io/avatars/36/${
                me.avatar
              }@adorable.io.png`}
            />
            <div className="message-text">
              <div className="author-handle">{me.handle}</div>
              <span>{message.text}</span>
            </div>
          </div>
        ) : (
          <div className="others-message" key={index}>
            <img
              alt=""
              src={`https://api.adorable.io/avatars/36/${
                playerMap.get(message.author).avatar
              }@adorable.io.png`}
            />
            <div className="message-text">
              <div className="author-handle">
                {playerMap.get(message.author).handle}
              </div>
              <span>{message.text}</span>
            </div>
          </div>
        )
      )}
      <div className="chat-input-container">
        <input
          type="text"
          value={message}
          onKeyPress={e => {
            if (e.charCode === 13) {
              onMessage(message);
              setMessage("");
            }
          }}
          onChange={e => setMessage(e.target.value)}
        />
        <ArrowRightRounded
          className="send-icon"
          onClick={() => message && onMessage(message)}
        />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { ArrowRightRounded } from "@material-ui/icons";
import "./index.css";

export function Chat({ chatMessages, me, players, onMessage, onRead }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    onRead(true);

    return () => {
      onRead(false);
    };
  }, []);

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
                players.find(player => player.id === message.author).avatar
              }@adorable.io.png`}
            />
            <div className="message-text">
              <div className="author-handle">
                {players.find(player => player.id === message.author).handle}
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

import React, { useState, useEffect } from "react";
import { ArrowRightRounded } from "@material-ui/icons";
import { Avatar, Card, Typography, withStyles } from "@material-ui/core";
import "./index.css";

export const styles = theme => ({
  root: {},
  myCard: {
    backgroundColor: theme.palette.primary.light
  },
  otherCard: {
    backgroundColor: theme.palette.secondary.light
  }
});

function ChatComponent({
  chatMessages,
  me,
  players,
  onMessage,
  onRead,
  classes
}) {
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
            <Avatar
              alt=""
              src={`https://api.adorable.io/avatars/36/${
                me.avatar
              }@adorable.io.png`}
            />
            <Card className={["message-text", classes.myCard].join(" ")}>
              <Typography component="h3" className="author-handle">
                {me.handle}
              </Typography>
              <Typography component="p">{message.text}</Typography>
            </Card>
          </div>
        ) : (
          <div className="others-message" key={index}>
            <Avatar
              alt=""
              src={`https://api.adorable.io/avatars/36/${
                players.find(player => player.id === message.author).avatar
              }@adorable.io.png`}
            />
            <Card className={["message-text", classes.otherCard].join(" ")}>
              <Typography component="h3" className="author-handle">
                {players.find(player => player.id === message.author).handle}
              </Typography>
              <Typography component="p">{message.text}</Typography>
            </Card>
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

export const Chat = withStyles(styles, { withTheme: true })(ChatComponent);

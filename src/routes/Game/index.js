import React from "react";
import {
  HomeOutlined,
  ChatBubbleOutlined,
  PersonOutlined
} from "@material-ui/icons";
import { Link, Route } from "react-router-dom";
import "./index.css";

export const Game = ({ messages, players, gameState }) => {
  return (
    <div className="game-container">
      <div className="tab-container">
        <div className="tab">
          <Link className="link" to="/game/home">
            <HomeOutlined className="tab-icon" />
          </Link>
        </div>
        <div className="tab">
          <Link className="link" to="/game/chat">
            <ChatBubbleOutlined className="tab-icon" />
          </Link>
        </div>
        <div className="tab">
          <Link className="link" to="/game/players">
            <PersonOutlined className="tab-icon" />
          </Link>
        </div>
      </div>
      <div className="tab-content">
        <Route path="/game/home" render={() => <div>Home</div>} />
        <Route
          path="/game/chat"
          render={() => (
            <div className="tab-content-sleeve">
              <h2>Chat</h2>
              {messages.map(message => (
                <div key={message.id}>{message}</div>
              ))}
            </div>
          )}
        />
        <Route path="/players" render={() => <div>Players</div>} />
      </div>
    </div>
  );
};

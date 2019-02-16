import React from "react";
import {
  HomeOutlined,
  ChatBubbleOutlined,
  PersonOutlined,
  PowerSettingsNewOutlined
} from "@material-ui/icons";
import { Link, Route } from "react-router-dom";
import "./index.css";
import { Chat } from "./chat";
import { Leave } from "./leave";
import { Players } from "./players";

export const Game = props => {
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
        <div className="tab">
          <Link className="link" to="/game/leave">
            <PowerSettingsNewOutlined className="tab-icon" />
          </Link>
        </div>
      </div>
      <div className="tab-content">
        <Route path="/game/home" render={() => <div>Home</div>} />
        <Route path="/game/chat" render={() => <Chat {...props} />} />
        <Route path="/game/players" render={() => <Players {...props} />} />
        <Route
          path="/game/leave"
          render={() => <Leave onLeave={props.onLeave} />}
        />
      </div>
    </div>
  );
};

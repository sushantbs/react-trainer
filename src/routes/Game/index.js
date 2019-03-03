import React, { useState, useEffect } from "react";
import {
  HomeOutlined,
  ChatBubbleOutlined,
  PersonOutlined,
  PowerSettingsNewOutlined
} from "@material-ui/icons";
import { AppBar, Tabs, Tab, Badge } from "@material-ui/core";
import { Route } from "react-router-dom";
import "./index.css";
import { Chat } from "./chat";
import { Leave } from "./leave";
import { Players } from "./players";

export const Game = props => {
  const { chatMessages = [] } = props;

  const messageCount = chatMessages.length;
  const [readMessageCount, setReadMessageCount] = useState(0);
  const [chatActive, setChatActive] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const onChatRead = active => setChatActive(active);

  const onTabChange = (e, value) => setTabValue(value);

  const goToURL = url => {
    if (window.location.pathname !== url) {
      props.history.push(url);
    }
  };

  useEffect(() => {
    if (chatActive) {
      setReadMessageCount(messageCount);
    }
  });

  useEffect(() => {
    switch (tabValue) {
      case 0:
        goToURL("/game/home");
        break;

      case 1:
        goToURL("/game/chat");
        break;

      case 2:
        goToURL("/game/players");
        break;

      case 3:
        goToURL("/game/leave");
        break;

      default:
    }
  }, [tabValue]);

  return (
    <div className="game-container">
      <div className="tab-container">
        <AppBar position="static" color="primary">
          <Tabs
            className="full-width-tabs"
            variant="fullWidth"
            centered={true}
            onChange={onTabChange}
            value={tabValue}
          >
            <Tab icon={<HomeOutlined className="tab-icon" />} />
            <Tab
              icon={<ChatBubbleOutlined className="tab-icon" />}
              label={
                messageCount - readMessageCount ? (
                  <div className="tab-notification">
                    <Badge
                      badgeContent={messageCount - readMessageCount}
                      color="secondary"
                    />
                  </div>
                ) : null
              }
            />
            <Tab icon={<PersonOutlined className="tab-icon" />} />
            <Tab icon={<PowerSettingsNewOutlined className="tab-icon" />} />
          </Tabs>
        </AppBar>
      </div>
      <div className="tab-content">
        <Route path="/game/home" render={() => <div>Home</div>} />
        <Route
          path="/game/chat"
          render={() => <Chat {...props} onRead={onChatRead} />}
        />
        <Route path="/game/players" render={() => <Players {...props} />} />
        <Route
          path="/game/leave"
          render={() => <Leave onLeave={props.onLeave} />}
        />
      </div>
    </div>
  );
};

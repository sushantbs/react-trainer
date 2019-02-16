import React, { useState } from "react";
import { CallRounded } from "@material-ui/icons";
import { Card } from "@material-ui/core";

export function Players(props) {
  const { players } = props;
  const webRTCCallPlayer = () => {};

  return (
    <div className="players-container">
      <h2> Players </h2>
      <div className="player-list">
        {players.map((player, index) => (
          <Card className="player-item" key={index}>
            <div className="player-info">
              <img
                src={`https://api.adorable.io/avatars/60/${
                  player.avatar
                }@adorable.io.png`}
              />
              <div className="player-details">
                <h3>{player.handle}</h3>
              </div>
            </div>
            <div className="player-comm">
              <CallRounded onClick={webRTCCallPlayer} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import ArrowForward from "@material-ui/icons/ArrowForward";
import CheckCircle from "@material-ui/icons/CheckCircle";
import {
  IconButton,
  InputBase,
  Icon,
  Select,
  MenuItem
} from "@material-ui/core";
import { withRouter } from "react-router";

function ChoosePath(props) {
  const { history } = props;
  const [selectedPath, setSelectedPath] = useState("access_key");
  const [accessKey, setAccessKey] = useState("");
  const [game, setGame] = useState("");
  return (
    <>
      <div className="root-container">
        <div className="info-container">
          <div className="landing__blurb-title">Path</div>
          <div className="landing__blurb">Choose a path</div>
        </div>
        <div className="user-input-container">
          <div
            className={
              selectedPath === "access_key"
                ? "user-input-container__top selected"
                : "user-input-container__top"
            }
            onClick={() => {
              setSelectedPath("access_key");
            }}
          >
            <div className="user-input-container-heading">
              Enter access key to join an already existing team
            </div>
            <div className="input-label">Access Key</div>
            <div className="user-input-field">
              <Icon className="user-input-icon">vpn_key</Icon>
              <InputBase
                autoFocus={true}
                autoComplete="off"
                className="user-input-text"
                placeholder="99999"
                value={accessKey}
                onChange={event => {
                  setAccessKey(event.target.value);
                }}
              />
              <IconButton className="">
                <CheckCircle className="action__check-circle" />
              </IconButton>
            </div>
          </div>
          <div className="user-input-divider">
            <div>OR</div>
          </div>
          <div
            className={
              selectedPath === "create_game"
                ? "user-input-container__bottom selected"
                : "user-input-container__bottom"
            }
            onClick={() => {
              setSelectedPath("create_game");
            }}
          >
            <div className="user-input-container-heading">Create a game </div>
            <div className="input-label">Create</div>
            <div className="user-input-field">
              <Icon className="user-input-icon">add</Icon>
              <Select displayEmpty name="game" value={game} onChange={(event) => {
                setGame(event.target.value);
              }}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"game1"}>Game1</MenuItem>
                <MenuItem value={"game2"}>Game2</MenuItem>
              </Select>
              <IconButton className="">
                <CheckCircle className="action__check-circle" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="action-container">
          <div className="action__submit-label">NEXT</div>
          <IconButton
            className="action__submit-button"
            onClick={e => {
              console.log(selectedPath);
              if(selectedPath === "access_key"){
                let dataToSend =  accessKey;
                console.log(dataToSend);
                //save data call
                history.push("/profile");
              } else if(selectedPath === "create_game"){
                let dataToSend =  game;
                console.log(dataToSend);
                //save data call
                history.push("/profile");
              }
            }}
          >
            <ArrowForward className="action__arrow-forward-icon" />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default withRouter(ChoosePath);

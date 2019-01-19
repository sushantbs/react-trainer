import React, { useState } from "react";
import ArrowForward from "@material-ui/icons/ArrowForward";
import CheckCircle from "@material-ui/icons/CheckCircle";
import {
  IconButton,
  InputBase,
  Avatar,
  withStyles
} from "@material-ui/core";
import { withRouter } from "react-router";
import MuiRoot from "./withMui";

const styles = theme => {
  return {
    bigAvatar: {
      margin: 10,
      width: 100,
      height: 100,
      border: "2px solid #F8F8F8",
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)"
    },
    uploadPhoto: {
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyItems: "center"
    },
    selectedAvatar: {
      border: "2px solid blue"
    }
  };
};

function Profile(props) {
  const { classes, history } = props;
  const [bio, setBio] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("a0");
  return (
    <>
      <div className="root-container">
        <div className="info-container">
          <div className="landing__blurb-title">You!</div>
          <div className="landing__blurb">
            Choose an avatar and set a bio for your profile
          </div>
        </div>
        <div className="user-input-container user-input-container-profile-page">
          <div className="user-input-container__top">
            <div className="input-label">Avatar</div>
            <div className="user-input-field">
              {Array.from({ length: 15 }).map((v, i) => {
                const avatarName = `a${i}`;
                const isSelected = avatarName === selectedAvatar ? true : false;
                let classNames = `${classes.bigAvatar}`;
                if (isSelected) {
                  classNames = ` ${classNames} ${classes.selectedAvatar}`;
                }
                return (
                  <Avatar
                    key={`avatar-${i}`}
                    src={`https://api.adorable.io/avatars/200/${avatarName}@adorable.io.png`}
                    className={classNames}
                    onClick={() => {
                      setSelectedAvatar(avatarName);
                    }}
                  />
                );
              })}
            </div>
            <div className="input-label">Bio</div>
            <div className="user-input-field">
              <InputBase
                value={bio}
                multiline
                rows="2"
                autoFocus={true}
                onChange={(event) => {
                  setBio(event.target.value)
                }}
              />
              <IconButton className="">
                <CheckCircle className="action__check-circle" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="action-container">
          <div className="action__submit-label">START</div>
          <IconButton
            className="action__submit-button"
            onClick={e => {
              let dataToSend = {
                bio: bio,
                selectedAvatar: selectedAvatar
              }
              //save data call
              console.log(dataToSend);
              history.push("/game");
            }}
          >
            <ArrowForward className="action__arrow-forward-icon" />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default withStyles(styles)(MuiRoot(withRouter(Profile)));


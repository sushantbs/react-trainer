import React, { useState } from "react";
import NavigateNext from "@material-ui/icons/NavigateNext";
import MuiRoot from "./withMui";
import {
  withStyles,
  IconButton,
  InputBase,
  Icon,
  Avatar,
  TextField
} from "@material-ui/core";

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

function ChooseAvatar(props) {
  const { classes } = props;
  const [selectedAvatar, setSelectedAvatar] = useState("a0");
  return (
    <>
      <div className="left">
        <div className="landing__blurb-title">You!</div>
        <div className="landing__blurb">Choose an avatar for your profile</div>
      </div>
      <div className="right profile-container">
        <div className="avatar-container">
          <div className="input-label">
            Avatar
          </div>
          <div className="select-avatar register__input-field">
            {Array.from({ length: 15 }).map((v, i) => {
              const avatarName = `a${i}`;
              const isSelected = avatarName == selectedAvatar ? true : false;
              let classNames = `${classes.bigAvatar}`;
              if (isSelected) {
                classNames = ` ${classNames} ${classes.selectedAvatar}`;
              }
              return (
                <Avatar
                  src={`https://api.adorable.io/avatars/200/${avatarName}@adorable.io.png`}
                  className={classNames}
                  onClick={() => {
                    setSelectedAvatar(avatarName);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div className="register__input-label register__input-username-label">
            Bio
          </div>
          <div className="register__input-field">
            <InputBase multiline className="register__input textarea"  rows="2" margin="normal" />
            <IconButton
              className="register__submit-button"
              onClick={e => this.submitJoinRequest()}
            >
              <NavigateNext/>
            </IconButton>
          </div>

          {/* <IconButton
            className="register__submit-button"
            onClick={e => this.submitJoinRequest()}
          >
            <NavigateNext />
          </IconButton> */}
        </div>
      </div>
    </>
  );
}

export default withStyles(styles)(MuiRoot(ChooseAvatar));

import React, { useState } from "react";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { IconButton, InputBase, Avatar, withStyles } from "@material-ui/core";
import MuiRoot from "../../withMui";

const styles = theme => {
  return {
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60,
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

const updateProfile = async (handle, avatar) => {
  let response = await fetch("/api/profile", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      accepts: "application/json"
    },
    body: JSON.stringify({ handle, avatar })
  });

  return await response.json();
};

function Profile(props) {
  const { classes, history, onProfileUpdate } = props;

  const [bio, setBio] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("a0");

  return (
    <div className="root-container">
      <div className="info-container">
        <div className="title">Profile</div>
        <p>Choose an avatar and a handle for your profile</p>
      </div>
      <div className="user-input-container user-input-container-profile-page">
        <div className="user-input-container">
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
          <div className="input-label">Handle</div>
          <div className="user-input-field">
            <InputBase
              value={bio}
              multiline
              rows="2"
              autoFocus={true}
              onChange={event => {
                setBio(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="action-container">
        <div className="submit-label">START</div>
        <IconButton
          className="submit-button"
          onClick={async e => {
            let response = await updateProfile(bio, selectedAvatar);
            if (response.handle === bio) {
              const { handle, id, avatar } = response;
              onProfileUpdate({ handle, id, avatar });
              history.push("/game/home");
            }
          }}
        >
          <ArrowForward className="arrow-forward-icon" />
        </IconButton>
      </div>
    </div>
  );
}

export default withStyles(styles)(MuiRoot(Profile));

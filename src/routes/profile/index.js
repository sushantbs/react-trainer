import React, { useState } from "react";
import {
  Button,
  InputBase,
  Avatar,
  withStyles,
  Typography,
  Paper
} from "@material-ui/core";

const styles = theme => {
  return {
    root: {
      width: "100%",
      marginBottom: "10px",
      padding: "5px"
    },
    section: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap"
    },
    input: {
      fontSize: "60px"
    },
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
    <div className="profile-container">
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5"> Avatar </Typography>
        <div className={classes.section}>
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
      </Paper>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5">Handle</Typography>
        <div className={classes.section}>
          <InputBase
            className={classes.input}
            value={bio}
            autoFocus={true}
            onChange={event => {
              setBio(event.target.value);
            }}
          />
        </div>
      </Paper>
      <div className="action-container">
        <Button
          color="primary"
          variant="contained"
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
          START
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(Profile);

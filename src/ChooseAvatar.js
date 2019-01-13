import React, { useState } from "react";
import NavigateNext from "@material-ui/icons/NavigateNext";
import MuiRoot from "./withMui";
import {
  withStyles,
  IconButton,
  InputBase,
  Icon,
  Avatar
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
    }
  };
};

function ChooseAvatar(props) {
  const { classes } = props;
  console.log(classes);
  return (
    <>
      <div className="left">
        <div className="landing__blurb-title">You!</div>
        <div className="landing__blurb">Choose an avatar for your profile</div>
      </div>
      <div className="right">
        <div className="avatar__container">
          <Avatar
            src="https://api.adorable.io/avatars/200/a@adorable.io.png"
            className={classes.bigAvatar}
          />
          <Avatar
            src="https://api.adorable.io/avatars/200/a1@adorable.io.png"
            className={classes.bigAvatar}
          />
          <Avatar
            src="https://api.adorable.io/avatars/200/a2@adorable.io.png"
            className={classes.bigAvatar}
          />
          <Avatar
            src="https://api.adorable.io/avatars/200/a3@adorable.io.png"
            className={classes.bigAvatar}
          />
          <Avatar
            src="https://api.adorable.io/avatars/200/a4@adorable.io.png"
            className={classes.bigAvatar}
          />
          <Avatar
            src="https://api.adorable.io/avatars/200/a5@adorable.io.png"
            className={classes.bigAvatar}
          />
          <Avatar
            src="https://api.adorable.io/avatars/200/a6@adorable.io.png"
            className={classes.bigAvatar}
          />
          <Avatar
            src="https://api.adorable.io/avatars/200/a7@adorable.io.png"
            className={classes.bigAvatar}
          />
          <Avatar
            src="https://api.adorable.io/avatars/200/a8@adorable.io.png"
            className={classes.bigAvatar}
          />
          <Avatar
            src="https://api.adorable.io/avatars/200/a9@adorable.io.png"
            className={classes.bigAvatar}
          />
          <Avatar
            src="https://api.adorable.io/avatars/200/a10@adorable.io.png"
            className={classes.bigAvatar}
          />
          <Avatar
            src="https://api.adorable.io/avatars/200/a11@adorable.io.png"
            className={classes.bigAvatar}
          />
          <div className={[classes.bigAvatar, classes.uploadPhoto]}>
            Upload Photo
          </div>
        </div>
      </div>
    </>
  );
}

export default withStyles(styles)(MuiRoot(ChooseAvatar));

import React, { useState } from "react";
import NavigateNext from "@material-ui/icons/NavigateNext";
import MuiRoot from "./withMui";
import {
  withStyles,
  IconButton,
  InputBase,
  Icon,
  Avatar,
  TextField,
  Select,
  MenuItem
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

function ChoosePath(props) {
  const { classes } = props;
  const [selectedAvatar, setSelectedAvatar] = useState("a0");
  return (
    <>
      <div className="root-container">
        <div className="info-container">
          <div className="landing__blurb-title">Path!</div>
          <div className="landing__blurb">Choose your path</div>
        </div>
        <div className="profile-container user-input-container">
          <div className="avatar-container">
            <div className="input-label">Access Key</div>
            <div className="select-avatar register__input-field">
              <Icon className="register__input-icon">vpn_key</Icon>
              <InputBase
                autofocus={true}
                autoComplete="off"
                className="register__input register__input-usename"
                placeholder="Joe"
              />
            </div>
          </div>
          <div className="avatar-container">
            <div className="input-label">Create</div>
            <div className="select-avatar register__input-field">
              <Icon className="register__input-icon">add</Icon>
              <Select displayEmpty name="age">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Game1</MenuItem>
                <MenuItem value={20}>Game2</MenuItem>
              </Select>
            </div>
          </div>
        </div>
        <div className="action-container">
          <IconButton
            className="register__submit-button"
            onClick={e => this.submitJoinRequest()}
          >
            <NavigateNext />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default withStyles(styles)(MuiRoot(ChoosePath));

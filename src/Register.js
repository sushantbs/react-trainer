import React, { useState } from "react";
import NavigateNext from "@material-ui/icons/NavigateNext";
import MuiRoot from "./withMui";
import {
  withStyles,
  IconButton,
  InputBase,
  Icon
} from "@material-ui/core";

const styles = theme => {
  return {
    root: {}
  };
};

function App() {
  return (
    <>
      <div className="left">
        <div className="landing__blurb-title">Welcome Back</div>
        <div className="landing__blurb">
          Login with your username and password
        </div>
      </div>
      <div className="right">
        <div>
          <div className="register__input-container">
            <div className="register__input-label register__input-username-label">
              Username
            </div>
            <div className="register__input-field">
              <Icon className="register__input-icon">perm_identity</Icon>
              <InputBase
                autofocus={true}
                autoComplete="off"
                className="register__input register__input-usename"
                placeholder="Joe"
              />
            </div>
            <div className="register__input-label register__input-username-label">
              Password
            </div>
            <div className="register__input-field">
              <Icon className="register__input-icon">lock</Icon>
              <InputBase
                autoComplete="off"
                type="password"
                className="register__input register__input-password"
                placeholder="****"
              />
              <IconButton
                className="register__submit-button"
                onClick={e => this.submitJoinRequest()}
              >
                <NavigateNext />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withStyles(styles)(MuiRoot(App));

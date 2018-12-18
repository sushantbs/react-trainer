import React, { Component } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Smiley from "@material-ui/icons/SentimentSatisfiedAlt";
import { withStyles, Button, TextField } from "@material-ui/core";

import JoinGame from "./Join";

const styles = theme => ({
  form: {
    background: theme.palette.secondary.light,
    padding: 40,
    borderRadius: 5,
    width: 350
  },
  formInput: {
    marginBottom: 20,
    marginTop: 20
  }
});

class SignupPage extends Component {
  state = {
    username: "",
    password: ""
  };

  _changeStateVar(stateVar, val) {
    this.setState({
      [stateVar]: val
    });
  }

  submitLoginRequest() {
    if (this.state.username && this.state.password) {
      setTimeout(() => {
        this.props.onAuthSuccess && this.props.onAuthSuccess();
      }, 500);
    }
  }

  render() {
    let { classes } = this.props;
    return (
      <div className={classes.form}>
        <Smiley />
        <div> This is the signup page</div>
        <TextField
          className={classes.formInput}
          fullWidth={true}
          InputProps={{
            value: this.state.username,
            placeholder: "Username",
            onChange: e => this._changeStateVar("username", e.target.value)
          }}
        />

        <TextField
          className={classes.formInput}
          fullWidth={true}
          InputProps={{
            value: this.state.password,
            placeholder: "Password",
            onChange: e => this._changeStateVar("password", e.target.value)
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={e => this.submitLoginRequest()}
        >
          Login
        </Button>
      </div>
    );
  }
}

const StyledSignup = withStyles(styles)(SignupPage);

export const AuthRoute = ({ userApp: Component, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props => {
      let { onAuthSuccess } = routeProps;
      return routeProps.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <StyledSignup {...props} onAuthSuccess={onAuthSuccess} />
      );
    }}
  />
);

const Game = () => <div> this is a game </div>;

export const UserApp = appProps => (
  <BrowserRouter>
    <div className="app-page">
      <Route path="/join" component={JoinGame} />
      <Route path="/game/:id" component={Game} />
      <Route path="/" exact render={props => <Redirect to="/join" />} />
    </div>
  </BrowserRouter>
);

import React, { Component } from "react";
import Smiley from "@material-ui/icons/SentimentSatisfiedAlt";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

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
      </div>
    );
  }
}

export default withStyles(styles)(SignupPage);

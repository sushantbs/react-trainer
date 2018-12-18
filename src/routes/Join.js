import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withStyles, Button, TextField } from "@material-ui/core";

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

class JoinGame extends Component {
  state = {
    passcode: "",
    alias: "",
    gameId: null
  };

  _changeStateVar(stateVar, val) {
    this.setState({
      [stateVar]: val
    });
  }

  submitJoinRequest() {
    this.setState({
      gameId: "dummygame"
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.form}>
        <div> Want to join an existing game? </div>
        <TextField
          className={classes.formInput}
          fullWidth={true}
          InputProps={{
            value: this.state.passcode,
            placeholder: "Game Passcode",
            onChange: e => this._changeStateVar("passcode", e.target.value)
          }}
        />

        <TextField
          className={classes.formInput}
          fullWidth={true}
          InputProps={{
            value: this.state.alias,
            placeholder:
              "Game Alias (leave it blank to use your registered name)",
            onChange: e => this._changeStateVar("alias", e.target.value)
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={e => this.submitJoinRequest()}
        >
          Join
        </Button>
        {this.state.gameId ? (
          <Redirect to={`/game/${this.state.gameId}`} />
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(JoinGame);

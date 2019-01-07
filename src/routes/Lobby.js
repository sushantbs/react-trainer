import React, { Component } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  TextField,
  withStyles,
  Button,
  CardActions,
  MenuItem
} from "@material-ui/core";

const styles = {
  cardSection: {
    display: "flex",
    flexDirection: "row"
  },
  card: {
    width: 330,
    margin: 10
  }
};

class LobbyPage extends Component {
  state = {
    joinAccessKey: "",
    joinPlayerName: "",
    createRoomType: null,
    createPlayerName: "",
    gameId: null
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.cardSection}>
        <Card className={classes.card}>
          <CardHeader title="Join Room" />
          <CardContent>
            <Typography> Enter the room access key and your name </Typography>
            <TextField
              label="Room Access Key"
              value={this.state.joinAccessKey}
              onChange={e => this._onStateChangeEvent("joinAccessKey", e)}
            />
            <TextField
              label="Player Name"
              value={this.state.joinPlayerName}
              onChange={e => this._onStateChangeEvent("joinPlayerName", e)}
            />
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={e => this.joinRoom()}
            >
              Join
            </Button>
          </CardActions>
        </Card>
        <hr />
        <Card className={classes.card}>
          <CardHeader title="Create Room" />
          <CardContent>
            <Typography>Create a room and invite others to join</Typography>
            <TextField
              label="Player Name"
              value={this.state.createPlayerName}
              onChange={e => this._onStateChangeEvent("createPlayerName", e)}
            />
            <TextField
              label="Select Room Type"
              select
              value={this.state.createRoomType}
              onChange={e => this._onStateChangeEvent("createRoomType", e)}
            >
              <MenuItem>Room Type 1</MenuItem>
              <MenuItem>Room Type 2</MenuItem>
            </TextField>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={e => this.createRoom()}
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(LobbyPage);

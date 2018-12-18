import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import MuiRoot from "./withMui";

import "./App.css";
import { AuthRoute, UserApp } from "./routes/Index";
import ProfilePage from "./routes/Profile";
import {
  withStyles,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Drawer
} from "@material-ui/core";

const styles = theme => {
  return {
    root: {}
  };
};

class App extends Component {
  state = {
    drawerOpened: false,
    isAuthenticated: false
  };

  render() {
    return (
      <div className="App">
        <IconButton
          className="menu-button"
          onClick={e => this.setState({ drawerOpened: true })}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="temporary"
          open={this.state.drawerOpened}
          onClose={e => this.setState({ drawerOpened: false })}
        >
          <Typography variant="h6">React Training</Typography>
          <div>This is the drawer</div>
        </Drawer>
        <BrowserRouter>
          <div className="content">
            <Route path="/register" component={ProfilePage} />
            <AuthRoute
              path="/"
              userApp={UserApp}
              isAuthenticated={this.state.isAuthenticated}
              onAuthSuccess={() => {
                this.setState({ isAuthenticated: true });
              }}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default withStyles(styles)(MuiRoot(App));

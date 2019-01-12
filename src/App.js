import React, { Component, useState } from "react";
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

function App() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <IconButton
        className="menu-button"
        onClick={e => setDrawerOpened(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={drawerOpened}
        onClose={e => setDrawerOpened(false)}
      >
        <Typography variant="h6">React Training</Typography>
        <div>This is the drawer</div>
      </Drawer>
      <BrowserRouter>
        <div className="content">
          <Route path="/register" component={ProfilePage} />
          {/**
             * Design discussion:
             * The AuthRoute component here handles the verification
             * of the users credentials and if the user is not authenticated
             * redirects her/him to the register/login page.
             * What are the potential issues with this design?
             */}
          <AuthRoute
            path="/"
            userApp={UserApp}
            isAuthenticated={isAuthenticated}
            onAuthSuccess={() => {
              setIsAuthenticated(true)
            }}
          />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default withStyles(styles)(MuiRoot(App));

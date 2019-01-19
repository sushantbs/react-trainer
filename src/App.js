import React, {useEffect} from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MuiRoot from "./withMui";
import "./App.css";
import {
  withStyles,
} from "@material-ui/core";
import Profile from "./Profile";
import ChoosePath from "./ChoosePath";

const styles = theme => {
  return {
    root: {}
  };
};

function App() {
  useEffect(() => {
  });
  return (
    <BrowserRouter>
      <div className="main-container">
        <Route exact path="/" component={ChoosePath} />
        <Route exact path="/profile" component={Profile} />
      </div>
    </BrowserRouter>
  );
}

export default withStyles(styles)(MuiRoot(App));

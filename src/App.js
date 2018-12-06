import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import IndexPage from "./routes/Index";
import ProfilePage from "./routes/Profile";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">React Training</header>
        <BrowserRouter>
          <div>
            <Route path="/profile" component={ProfilePage} />
            <Route path="/" exact component={IndexPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

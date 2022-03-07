import "./App.css";
import "theme/css/light-theme.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import React from "react";
import Views from "./views";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Views} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

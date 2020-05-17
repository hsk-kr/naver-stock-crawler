import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/HomePage";
import Crawler from "./containers/CrawlerPage";
import Header from "./containers/Header";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/crawler">
            <Crawler />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

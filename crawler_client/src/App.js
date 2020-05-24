import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/HomePage";
import Header from "./containers/Header";
import CrawlerPage from "./containers/CrawlerPage";
import CrawlerListPage from "./containers/CrawlerListPage";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/crawler">
            <CrawlerPage />
          </Route>
          <Route path="/history/:page">
            <CrawlerListPage />
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

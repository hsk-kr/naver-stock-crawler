import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/HomePage";
import Header from "./containers/Header";
import CrawlerPage from "./containers/CrawlerPage";
import CrawlerListPage from "./containers/CrawlerListPage";
import StockListPage from "./containers/StockListPage";
import StockDetailPage from "./containers/StockDetailPage";

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
          <Route path="/stocklist/:crawlerid">
            <StockListPage />
          </Route>
          <Route path="/stock/:stockid">
            <StockDetailPage />
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

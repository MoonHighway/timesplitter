import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { render } from "react-dom";
import { GlobalStyle } from "./theme";
import Cover from "./pages/Cover";
import Agenda from "./pages/Agenda";
import HowToUse from "./pages/HowToUse";
import Overview from "./pages/Overview";
import End from "./pages/End";
import TOC from "./pages/TOC";

render(
  <>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route path="/agenda/:path">
          <Agenda />
        </Route>
        <Route path="/toc">
          <TOC />
        </Route>
        <Route path="/overview">
          <Overview />
        </Route>
        <Route path="/how-to-use">
          <HowToUse />
        </Route>
        <Route path="/end">
          <End />
        </Route>
        <Route path="/">
          <Cover />
        </Route>
      </Switch>
    </Router>
  </>,
  document.getElementById("root")
);

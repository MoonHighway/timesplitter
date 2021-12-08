import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { render } from "react-dom";
import { GlobalStyle } from "./theme";
import { TimesplitterProvider } from "./useTimesplitter";
import Agenda from "./pages/Agenda";
import Overview from "./pages/Overview";
import TableOfContents from "./pages/TableOfContents";

render(
  <TimesplitterProvider>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route path="/agenda/:path">
          <Agenda />
        </Route>
        <Route path="/overview">
          <Overview />
        </Route>
        <Route path="/">
          <TableOfContents />
        </Route>
      </Switch>
    </Router>
  </TimesplitterProvider>,
  document.getElementById("root")
);

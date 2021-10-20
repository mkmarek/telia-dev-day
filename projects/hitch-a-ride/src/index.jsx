// Needed for the generator functions which are transpiled from your async await keywords
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import { ArwesThemeProvider, StylesBaseline } from "@arwes/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

let themeSettings = {};

import "../styles/style.css";
import Intro from "./pages/intro";
import Catalogue from "./pages/catalogue";
import Reservation from "./pages/reservation";

const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const FONT_FAMILY_CODE = '"Source Code Pro", monospace';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ArwesThemeProvider themeSettings={themeSettings}>
        <StylesBaseline
          styles={{
            "html, body": { fontFamily: FONT_FAMILY_ROOT },
            "code, pre": { fontFamily: FONT_FAMILY_CODE },
          }}
        />
        <div className="sticky-background" />
        <Router>
          <Switch>
            <Route path="/reservation/:id">
              <Reservation />
            </Route>
            <Route path="/catalogue">
              <Catalogue />
            </Route>
            <Route path="/">
              <Intro />
            </Route>
          </Switch>
        </Router>
      </ArwesThemeProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

import ReactDOM from "react-dom";
import React from "react";

import { parseRoutePath, IRouteParseResult } from "ruled-router";

import { routerRules } from "./model/router-rules";

import Container from "./pages/container";
import { globalStore } from "store";

import "github-markdown-css";
import "style/main.css";

const renderApp = () => {
  let routerTree = parseRoutePath(window.location.hash.slice(1), routerRules);

  ReactDOM.render(<Container router={routerTree} store={globalStore.getState()} />, document.querySelector(".app"));
};

window.onload = () => {
  renderApp();
  globalStore.subscribe(renderApp);
};

window.addEventListener("hashchange", () => {
  renderApp();
});

declare var module: any;

if (module.hot) {
  module.hot.accept(["./pages/container"], () => {
    renderApp();
  });
}

import React from "react";
import _ from "lodash";
import { parseRoutePath, IRouteParseResult } from "ruled-router";
import { css } from "emotion";

import { IGlobalStore } from "model/global";
import YearView from "./year-view";
import Article from "./article";

interface IProps {
  store: IGlobalStore;
  router: IRouteParseResult;
}

interface IState {}

export default class Container extends React.Component<IProps, IState> {
  render() {
    return <div className={styleContainer}>{this.renderPage(this.props.store)}</div>;
  }

  renderPage(store: IGlobalStore) {
    switch (store.router.name) {
      case "home":
        return <YearView dict={store.dict} />;
      case "article":
        return <Article />;
      default:
        return <div>Unknown page {store.router.name}</div>;
    }
  }
}

const styleContainer = css`
  font-family: "Helvetica";
`;

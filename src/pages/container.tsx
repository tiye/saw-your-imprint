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
    let router = this.props.router;

    switch (router.name) {
      case "home":
        return <YearView dict={store.dict} />;
      case "article":
        return <Article article={store.dict[router.data.date]} />;
      default:
        return <div>Unknown page {router.name}</div>;
    }
  }
}

const styleContainer = css`
  font-family: "Helvetica";
`;

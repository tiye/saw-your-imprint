import React from "react";
import prodoce from "immer";
import _ from "lodash";
import { css } from "emotion";
import { DateTime } from "luxon";
import { IArticle } from "model/global";

interface IProps {
  article: IArticle;
}
interface IState {}

export default class Article extends React.Component<IProps, IState> {
  render() {
    if (this.props.article == null) {
      return <div>No article.</div>;
    }
    return <div>Article {this.props.article.title}</div>;
  }
}

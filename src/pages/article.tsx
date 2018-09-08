import React from "react";
import prodoce from "immer";
import _ from "lodash";
import { css, cx } from "emotion";
import { DateTime } from "luxon";
import { IArticle } from "model/global";

import commonmark from "commonmark";
import { fullscreen, column, flex } from "style/layout";
import hsl from "hsl";
import { routeBack } from "ctrl/route";

var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer({ softbreak: "<br />" } as any);

interface IProps {
  dateString: string;
  article: IArticle;
}
interface IState {}

export default class Article extends React.Component<IProps, IState> {
  render() {
    let { article } = this.props;

    if (article == null) {
      return <div>No article.</div>;
    }

    let parsed = reader.parse(this.hideMeta(article.content)); // parsed is a 'Node' tree
    let theDay = DateTime.fromFormat(this.props.dateString, "yyyy-MM-dd");

    return (
      <div className={cx(fullscreen, column, styleContainer)}>
        <div className={styleHeader} onClick={routeBack}>
          {theDay.toFormat("yyyy-MM-dd")}
        </div>
        <div className={flex}>
          <div className={cx("markdown-body", styleContent)}>
            <div dangerouslySetInnerHTML={{ __html: writer.render(parsed) }} />
          </div>
        </div>
      </div>
    );
  }

  hideMeta(content: string) {
    content = content.trim();

    if (content.match(/\n*---/)) {
      return content
        .split("\n")
        .slice(7)
        .join("\n");
    } else {
      return content;
    }
  }
}

const styleContainer = css``;

const styleContent = css`
  overflow: auto;
  max-width: 640px;
  margin: 40px auto 100px auto;
  padding: 16px;

  & .markdown-body {
    font-size: 14px;
    line-height: 22px;
  }
`;

const styleHeader = css`
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  box-shadow: 1px 2px 10px ${hsl(0, 0, 0, 0.1)};
  line-height: 48px;
  font-size: 20px;
  font-family: Josefin Sans, Helvetica neue, Arial, sans-serif;
  padding: 0 16px;
  font-weight: 300;
  color: #888;
`;

import React from "react";
import _ from "lodash";
import { parseRoutePath, IRouteParseResult } from "ruled-router";
import { css } from "emotion";

import data from "../data";

export default (props) => {
  let pairs = _.toPairs(data).map(([title, content]) => {
    return [title.slice(0, 10), { title: title.slice(10), content }];
  });
  let dict = _.fromPairs(pairs);

  console.log(dict);
  return (
    <div className={styleContainer}>
      <div className={styleTitle}>
        {pairs.map((x) => x[0]).map((x, idx) => {
          return <div key={idx}>{x}</div>;
        })}
      </div>
    </div>
  );
};

const styleContainer = css`
  font-family: "Helvetica";
`;

const styleTitle = css`
  margin-bottom: 16px;
`;

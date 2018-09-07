import React from "react";
import prodoce, { produce } from "immer";
import _ from "lodash";
import { css } from "emotion";
import { IArticlesDict } from "model/global";
import { row } from "style/layout";

interface IProps {
  dict: IArticlesDict;
}

interface IState {
  year: number;
}

let years = [2015, 2016, 2017, 2018];

export default class YearView extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      year: 2018,
    };
  }

  immerState(f: (s: IState) => void, cb?) {
    this.setState(produce<IState>(f), cb);
  }

  render() {
    return (
      <div className={row}>
        <div>
          {years.map((year) => {
            return (
              <div
                key={year}
                onClick={() => {
                  this.immerState((state) => {
                    state.year = year;
                  });
                }}
              >
                {year}
              </div>
            );
          })}
        </div>
        <div>{this.renderMonths(this.state.year)}</div>
      </div>
    );
  }

  renderMonths(year) {
    return (
      <div>
        {_.range(1, 13).map((m) => {
          return (
            <div key={m}>
              <div>{m}</div>
              {this.renderDays(m)}
            </div>
          );
        })}
      </div>
    );
  }

  renderDays(month) {
    return (
      <div className={row}>
        {_.range(1, 30).map((d) => {
          return (
            <div className={styleDayCell} key={d}>
              {d}
            </div>
          );
        })}
      </div>
    );
  }
}

const styleDayCell = css`
  width: 32px;
`;

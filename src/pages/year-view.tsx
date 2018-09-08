import React from "react";
import prodoce, { produce } from "immer";
import _ from "lodash";
import { cx, css } from "emotion";
import { IArticlesDict } from "model/global";
import { row, center } from "style/layout";

import { getMonthLength } from "util/date";
import { DateTime } from "luxon";
import Space from "kit/space";
import { routePage, routePath } from "ctrl/route";

interface IProps {
  dict: IArticlesDict;
}

interface IState {
  year: number;
}

let years = [2018, 2017, 2016, 2015, , ,];

let today = DateTime.local();

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
      <div className={cx(row, styleContainer)}>
        {this.renderYears()}
        {this.renderMonths(this.state.year)}
      </div>
    );
  }

  renderYears() {
    return (
      <div className={styleYearList}>
        {years.map((year) => {
          return (
            <div
              key={year}
              className={cx(styleYear, this.state.year === year ? styleYearSelected : null)}
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
    );
  }

  renderMonths(year) {
    return (
      <div className={cx(row, styleMonthTable)}>
        {_.sortBy(_.range(1, 13), (x) => -x).map((m) => {
          let monthFirstDay = DateTime.local(year, m, 1);
          let leftPaddingDays = monthFirstDay.weekday - 1;

          if (monthFirstDay > today) {
            return null;
          }

          return (
            <div key={m} className={styleMonthCalendar}>
              <div className={styleMonthName}>{monthFirstDay.toFormat("MMM")}</div>
              <Space height={8} />
              {this.renderDays(year, m, leftPaddingDays)}
            </div>
          );
        })}
      </div>
    );
  }

  renderDays(year, month, leftPaddingDays) {
    let days = getMonthLength(year, month);

    return (
      <div className={cx(styleWeekRow)}>
        {this.renderWeekNames()}

        {_.range(leftPaddingDays).map((x) => {
          return <div key={x - 10} className={styleDayCell} />;
        })}
        {_.range(1, days + 1).map((d) => {
          return (
            <div
              className={cx(center, styleDayCell, styleDayReal)}
              key={d}
              onClick={() => {
                let dateString = DateTime.local(year, month, d).toFormat("yyyy-MM-dd");
                routePath(`/article/${dateString}`);
              }}
            >
              {d}
            </div>
          );
        })}
      </div>
    );
  }

  renderWeekNames() {
    return (
      <>
        <div className={cx(center, styleDayCell, styleHeaderCell)}>Mo</div>
        <div className={cx(center, styleDayCell, styleHeaderCell)}>Tu</div>
        <div className={cx(center, styleDayCell, styleHeaderCell)}>We</div>
        <div className={cx(center, styleDayCell, styleHeaderCell)}>Th</div>
        <div className={cx(center, styleDayCell, styleHeaderCell)}>Fr</div>
        <div className={cx(center, styleDayCell, styleHeaderCell)}>Sa</div>
        <div className={cx(center, styleDayCell, styleHeaderCell)}>Su</div>
      </>
    );
  }
}

const styleDayCell = css`
  width: 32px;
  line-height: 32px;
  border-bottom: 1px solid #f6f6f6;
  color: #444;
  font-size: 14px;
`;

const styleWeekRow = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  width: ${32 * 7}px;
`;

const styleContainer = css`
  font-family: Josefin Sans, Helvetica neue, Arial, sans-serif;
`;

const styleMonthTable = css`
  flex-wrap: wrap;
`;

const styleMonthCalendar = css`
  margin: 16px;
`;

const styleYearList = css`
  margin: 16px;
`;

const styleYear = css`
  line-height: 32px;
  padding: 0 16px;
  color: #ccc;
  cursor: pointer;
  font-size: 20px;
  font-weight: 300;
`;

const styleYearSelected = css`
  color: black;
`;

const styleMonthName = css`
  color: #aaa;
  font-size: 20px;
  font-weight: 300;
`;

const styleDayReal = css`
  cursor: pointer;
`;

const styleHeaderCell = css`
  color: #ccc;
`;

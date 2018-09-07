import _ from "lodash";
import data from "../data";

let postsPairs = _.toPairs(data).map(([title, content]) => {
  return [title.slice(0, 10), { title: title.slice(10), content }];
});
let postsDict = _.fromPairs(postsPairs);

export interface IArticle {
  title: string;
  content: string;
}

export interface IArticlesDict {
  [time: string]: IArticle;
}

export interface IGlobalStore {
  schemaVersion: string;
  router: {
    name: string;
    data: any;
  };
  dict: IArticlesDict;
}

export let initialStore: IGlobalStore = {
  schemaVersion: "0.1",
  router: {
    name: "home",
    data: null,
  },
  dict: postsDict,
};

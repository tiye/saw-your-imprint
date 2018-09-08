import { IRouteRule } from "ruled-router";

export const routerRules: IRouteRule[] = [{ path: "year/:year" }, { path: "article/:date" }, { path: "", name: "year" }];

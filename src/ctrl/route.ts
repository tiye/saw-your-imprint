import { createStore, RexProvider } from "@jimengio/rex";
import { globalStore } from "store";

export function routePath(path: string) {
  location.hash = path;
}

export function routeBack() {
  history.back();
}

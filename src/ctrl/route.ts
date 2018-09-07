import { createStore, RexProvider } from "@jimengio/rex";
import { globalStore } from "store";

export function routePage(name, data) {
  globalStore.update((store) => {
    store.router = {
      name: name,
      data: data,
    };
  });
}

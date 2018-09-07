import { createStore, RexProvider } from "@jimengio/rex";
import { IGlobalStore, initialStore } from "model/global";

export let globalStore = createStore<IGlobalStore>(initialStore);

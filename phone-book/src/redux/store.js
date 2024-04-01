import { createStore } from "redux";
import reducer from "./reduceer/reduceer";

let store = createStore(reducer);

export default store;

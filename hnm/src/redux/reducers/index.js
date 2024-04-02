import { combineReducers } from "redux";
import authenticateReducer from "./authenticateReduce";
import productReducer from "./productReducer";

export default combineReducers({
  auth: authenticateReducer,
  product: productReducer,
});

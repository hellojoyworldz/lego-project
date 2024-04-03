import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
// import rootReducer from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";

import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "./reducers/authenticateReduce";
import productSlice from "./reducers/productSlice";

// let store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// 필요없어짐
// combineReducer
// thunk
// applyMiddleware
// composeWithDevTools

const store = configureStore({
  reducer: {
    auth: authenticateReducer,
    product: productSlice,
  },
});

export default store;

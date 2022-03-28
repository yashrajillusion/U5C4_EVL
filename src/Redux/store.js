import { loginReducer } from "./Login/loginReducer";
import { combineReducers, createStore } from "redux";

export const store = createStore(
  loginReducer,
  window.__REDUX_DEVTOOLS_EXTENSTION__ && window.__REDUX_DEVTOOLS_EXTENSTION__()
); // add your reducers here

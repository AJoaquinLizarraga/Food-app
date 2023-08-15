import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducer";

export const store = createStore(rootReducer,
 composeWithDevTools(applyMiddleware(thunkMiddleware))); // para que se puedan unar los devtools
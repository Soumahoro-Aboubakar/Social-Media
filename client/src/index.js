import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import rootReducer from "./reducers";
import "./styles/index.css";
import { applyMiddleware, configureStore, createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { getUsers } from "./actions/users.action";
import { getPosts } from "./actions/posts.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(getUsers())
store.dispatch(getPosts());
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

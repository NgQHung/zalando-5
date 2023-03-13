import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./resetCss.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./stores";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

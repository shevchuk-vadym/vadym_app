import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App/App.tsx";
import { BrowserRouter, HashRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./fonts/TheMixC5-5_Plain.woff2";
import "./fonts/TheMixC5-5iPlainItalic.woff2";
import "./fonts/TheMixC5-6_SemiBold.woff2";
import "./fonts/TheMixC5-7_Bold.woff2";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

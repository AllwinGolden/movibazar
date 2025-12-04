import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import { HashRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

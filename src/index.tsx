import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/customModal.css";
import App from "./App";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

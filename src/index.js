import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/index-page/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/login-page/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

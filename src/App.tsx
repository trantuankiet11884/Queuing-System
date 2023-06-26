import React from "react";
import "./global.css";
import Dashboard from "./pages/dashboard/dashboard";
import ChartComponent from "./components/Chart";
import LoginPage from "./pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import ForgotPwd from "./pages/auth/ForgotPwd";
import ConfirmForgotPwd from "./pages/auth/ConfirmForgotPwd";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/confimforgot" element={<ConfirmForgotPwd />}></Route>
        <Route path="/forgot-pwd" element={<ForgotPwd />}></Route>
      </Routes>
    </div>
  );
}

export default App;

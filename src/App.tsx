import React from "react";
import "./global.css";
import Dashboard from "./pages/dashboard/dashboard";
import LoginPage from "./pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import ForgotPwd from "./pages/auth/ForgotPwd";
import ConfirmForgotPwd from "./pages/auth/ConfirmForgotPwd";
import Device from "./pages/devies/Device";
import Profile from "./pages/profile/Profile";
import PostDevice from "./pages/devies/PostDevice";
import DetailDevice from "./pages/devies/DetailDevice";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/confirm-forgotpwd" element={<ConfirmForgotPwd />}></Route>
        <Route path="/forgot-pwd" element={<ForgotPwd />}></Route>
        <Route path="/devices" element={<Device />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/post-device" element={<PostDevice />}></Route>
        <Route path="/details-device" element={<DetailDevice />}></Route>
      </Routes>
    </div>
  );
}

export default App;

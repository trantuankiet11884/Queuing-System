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
import UpdateDevice from "./pages/devies/UpdateDevice";
import Service from "./pages/services/Service";
import PostService from "./pages/services/PostService";
import DetailService from "./pages/services/DetailService";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/confirm-forgotpwd" element={<ConfirmForgotPwd />}></Route>
        <Route path="/forgot-pwd" element={<ForgotPwd />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/devices" element={<Device />}></Route>
        <Route path="/post-device" element={<PostDevice />}></Route>
        <Route path="/details-device" element={<DetailDevice />}></Route>
        <Route path="/update-device" element={<UpdateDevice />}></Route>
        <Route path="/services" element={<Service />}></Route>
        <Route path="/post-service" element={<PostService />}></Route>
        <Route path="/details-service" element={<DetailService />}></Route>
      </Routes>
    </div>
  );
}

export default App;

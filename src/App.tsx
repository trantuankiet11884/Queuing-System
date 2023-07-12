import React, { useState, useEffect } from "react";
import "./global.css";
import Dashboard from "./pages/dashboard/dashboard";
import LoginPage from "./pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import ConfirmForgotPwd from "./pages/auth/ForgotPwd";
import Device from "./pages/devices/Device";
import Profile from "./pages/profile/Profile";
import PostDevice from "./pages/devices/PostDevice";
import DetailDevice from "./pages/devices/DetailDevice";
import UpdateDevice from "./pages/devices/UpdateDevice";
import Service from "./pages/services/Service";
import PostService from "./pages/services/PostService";
import DetailService from "./pages/services/DetailService";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "antd";
import { SiderBar } from "./components/Sidebar";
import UpdateService from "./pages/services/UpdateService";
import CapSo from "./pages/levelmanagment/Capso";
import CapSoMoi from "./pages/levelmanagment/CapSoMoi";
import CapSoChiTiet from "./pages/levelmanagment/CapSoChiTiet";
import Reportt from "./pages/report/Reportt";
import RolePage from "./pages/system/roleList/Role";
import PostRole from "./pages/system/roleList/PostRole";
import UpdateRole from "./pages/system/roleList/UpdateRole";
import AccountPage from "./pages/system/accountList/Account";
import PostAccount from "./pages/system/accountList/PostAccount";
import UpdateAccount from "./pages/system/accountList/UpdateAccount";
import NoteUser from "./pages/system/noteuser/NoteUser";
import ResetPwd from "./pages/auth/ResetPwd";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.account.isLoggedIn
  );

  return (
    <BrowserRouter>
      <div className="App">
        <Layout style={{ minHeight: "100vh" }}>
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/devices" element={<Device />} />
                <Route path="/post-device" element={<PostDevice />} />
                <Route path="/details-device/:id" element={<DetailDevice />} />
                <Route path="/update-device/:id" element={<UpdateDevice />} />
                <Route path="/services" element={<Service />} />
                <Route path="/post-service" element={<PostService />} />
                <Route
                  path="/details-service/:id"
                  element={<DetailService />}
                />
                <Route path="/update-service/:id" element={<UpdateService />} />
                <Route path="/numbers" element={<CapSo />} />
                <Route path="/post-number" element={<CapSoMoi />} />
                <Route path="/details-number/:id" element={<CapSoChiTiet />} />
                <Route path="/reports" element={<Reportt />} />
                <Route path="/roles" element={<RolePage />} />
                <Route path="/post-role" element={<PostRole />} />
                <Route path="/update-role/:id" element={<UpdateRole />} />
                <Route path="/accountlist" element={<AccountPage />} />
                <Route path="/post-account" element={<PostAccount />} />
                <Route path="/update-account/:id" element={<UpdateAccount />} />
                <Route path="/users" element={<NoteUser />} />
              </>
            ) : (
              <>
                <Route path="/" element={<LoginPage />} />
                <Route
                  path="/confirm-forgotpwd"
                  element={<ConfirmForgotPwd />}
                />
                <Route path="/reset-pwd" element={<ResetPwd />} />
              </>
            )}
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;

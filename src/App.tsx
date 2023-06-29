import React from "react";
import "./global.css";
import Dashboard from "./pages/dashboard/dashboard";
import LoginPage from "./pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import ConfirmForgotPwd from "./pages/auth/ConfirmForgotPwd";
import Device from "./pages/devies/Device";
import Profile from "./pages/profile/Profile";
import PostDevice from "./pages/devies/PostDevice";
import DetailDevice from "./pages/devies/DetailDevice";
import UpdateDevice from "./pages/devies/UpdateDevice";
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
import ResetPwd from "./pages/auth/ForgotPwd";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout style={{ minHeight: "100vh" }}>
          <SiderBar />{" "}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route
              path="/confirm-forgotpwd"
              element={<ConfirmForgotPwd />}
            ></Route>
            <Route path="/reset-pwd" element={<ResetPwd />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/devices" element={<Device />}></Route>
            <Route path="/post-device" element={<PostDevice />}></Route>
            <Route path="/details-device" element={<DetailDevice />}></Route>
            <Route path="/update-device" element={<UpdateDevice />}></Route>
            <Route path="/services" element={<Service />}></Route>
            <Route path="/post-service" element={<PostService />}></Route>
            <Route path="/details-service" element={<DetailService />}></Route>
            <Route path="/update-service" element={<UpdateService />}></Route>
            <Route path="/numbers" element={<CapSo />}></Route>
            <Route path="/post-number" element={<CapSoMoi />}></Route>
            <Route path="/details-number" element={<CapSoChiTiet />}></Route>
            <Route path="/reports" element={<Reportt />}></Route>
            <Route path="/roles" element={<RolePage />}></Route>
            <Route path="/post-role" element={<PostRole />}></Route>
            <Route path="/update-role" element={<UpdateRole />}></Route>
            <Route path="/accountlist" element={<AccountPage />}></Route>
            <Route path="/post-account" element={<PostAccount />}></Route>
            <Route path="/update-account" element={<UpdateAccount />}></Route>
            <Route path="/users" element={<NoteUser />}></Route>
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;

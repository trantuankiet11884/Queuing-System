import React from "react";
import {
  AreaChartOutlined,
  AppstoreOutlined,
  WechatOutlined,
  DesktopOutlined,
  BuildOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Form } from "antd";
import { Menu } from "antd";
import { Layout } from "antd";
import { logoAltaDashboard } from "../constant/Image";
import "../pages/dashboard/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/accountSlice";

const { Sider } = Layout;

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  path: string;
  children?: MenuItem[];
};

function getItem(
  label: React.ReactNode,
  key: string,
  icon: React.ReactNode,
  path: string,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    label,
    path,
    children,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "1", <AppstoreOutlined />, "/dashboard"),
  getItem("Thiết bị", "2", <DesktopOutlined />, "/devices"),
  getItem("Dịch vụ", "3", <WechatOutlined />, "/services"),
  getItem("Cấp số", "4", <BuildOutlined />, "/numbers"),
  getItem("Báo cáo", "5", <AreaChartOutlined />, "/reports"),
  getItem("Cài đặt hệ thống", "6", <SettingOutlined />, "/settings", [
    getItem("Quản lý vai trò", "6.1", <SettingOutlined />, "/roles"),
    getItem("Quản lý tài khoản", "6.2", <SettingOutlined />, "/accountlist"),
    getItem("Quản lý người dùng", "6.3", <SettingOutlined />, "/users"),
  ]),
];

export const SiderBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Sider theme="light" className="sidebar">
      <Form.Item className="d-flex justify-content-center mt-3">
        <div dangerouslySetInnerHTML={{ __html: logoAltaDashboard }}></div>
      </Form.Item>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="vertical"
        theme="light"
      >
        {items.map((item) =>
          item.children ? (
            <SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((child) => (
                <Menu.Item key={child.key}>
                  <Link to={child.path}>{child.label}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          )
        )}
      </Menu>
      <Button
        className="btn-logout"
        icon={<LogoutOutlined style={{ color: "#ff7506" }} />}
        onClick={handleLogout}
      >
        <span className="btn-text__logout">Đăng xuất</span>
      </Button>
    </Sider>
  );
};

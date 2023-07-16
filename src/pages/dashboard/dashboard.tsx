import { Card, Col, Row, Space } from "antd";
import { Layout } from "antd";
import {
  CalendarOutlined,
  ArrowUpOutlined,
  BugOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { SiderBar } from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import CapSoThongBao from "../../components/Notifycation";
import { fetchCapSo } from "../../redux/slices/capsoSlice";
import { Chart } from "chart.js";

const { Content, Header } = Layout;
const { Sider } = Layout;

const Dashboard: React.FC = () => {
  const [showComponent, setShowComponent] = useState(false);
  const dispatch: any = useDispatch();
  const data = useSelector((state: RootState) => state.account.currentAccount);
  const dataCapSo = useSelector((state: RootState) => state.levelNum.capSo);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [numberServiceCount, setNumberServiceCount] = useState(0);

  useEffect(() => {
    if (dataCapSo) {
      const newData = dataCapSo.map((item) => {
        setNumberServiceCount((prevCount) => prevCount + item.numberService);
        return item.numberService;
      });
      console.log(newData);

      const ctx = canvasRef.current?.getContext("2d");

      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: [1, 13, 19, 31],
            datasets: [
              {
                label: "Number of Services",
                data: newData,
                backgroundColor: "#7ce8ff",
              },
            ],
          },
          options: {
            responsive: true,
          },
        });
      }
    }
    dispatch(fetchCapSo());
  }, [dispatch]);

  const handleClick = () => {
    setShowComponent(!showComponent);
  };
  {
  }
  return (
    <>
      <SiderBar />

      <div className="main d-flex flex-column ">
        <div>
          <Header style={{ background: "#f6f6f6" }}>
            <Row className="mt-3 d-flex ">
              <div className="content-title">Dashboard</div>
            </Row>
            <Row className="mt-3">
              <span className="content-title-name">Biểu đồ cấp số</span>
            </Row>
          </Header>
        </div>

        <div className="d-flex justify-content-between p-5">
          <div>
            <Card>
              <div className="first-card">
                <div className="icon-card d-flex ">
                  <CalendarOutlined className="rounded" />
                  <p>So thu tu da cap</p>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card>2</Card>
          </div>
          <div>
            <Card>3</Card>
          </div>
          <div>
            <Card>4</Card>
          </div>
        </div>

        <div className="chart d-flex justify-content-center">
          <div className="chart">
            <canvas ref={canvasRef} id="myChart" />
          </div>
        </div>
      </div>

      <div className="sidebar-right">
        <Sider style={{ background: "#fff" }}>
          <Header
            style={{
              background: "#fff",
              paddingInline: "0",
              paddingLeft: "9%",
            }}
          >
            <div className="navbar-nav flex-row">
              <div
                className="nav-item dropdown d-none d-md-flex me-1 p-custom bell"
                onClick={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
              </div>

              {showComponent && (
                <div className="notification-component">
                  <CapSoThongBao />
                </div>
              )}

              <div className="nav-item dropdown pt-4">
                <div
                  className="nav-link d-flex lh-1 text-reset p-0"
                  data-bs-toggle="dropdown"
                  aria-label="Open user menu"
                  aria-expanded="false"
                >
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                  <div className="d-none d-xl-block ps-2">
                    <div className="mt-1 small text-muted">Xin chao</div>
                    <div className="mt-1 text-user">{data?.hvten}</div>
                  </div>
                </div>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                </div>
              </div>
            </div>
            <div className="sidebar-right__title mt-3">Tổng quan</div>
          </Header>
          <div className="d-flex justify-content-center align-items-center"></div>
        </Sider>
      </div>
    </>
  );
};

export default Dashboard;

import { Card, Col, Row, Space, Tag } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import {
  CalendarOutlined,
  ArrowUpOutlined,
  BugOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { SiderBar } from "../../components/Sidebar";

const Dashboard: React.FC = () => {
  return (
    <>
      <SiderBar />

      <Content>
        <Space>
          <Header style={{ background: "#f6f6f6" }}>
            <Row className="mt-3 d-flex ">
              <div className="content-title">Dashboard</div>
            </Row>
            <Row className="mt-3">
              <span className="content-title-name">Biểu đồ cấp số</span>
            </Row>
          </Header>
        </Space>

        <div className="content-card mt-4">
          <Row gutter={24}>
            <Col span={6}>
              <Card className="content-card__container">
                <div className="content-card__title">
                  <div className="content-card__icon">
                    <CalendarOutlined className="card-icon" />
                  </div>
                  <div className="content-card__text">Số thứ tự đã cấp</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="text-des">4.221 </p>
                  <Tag
                    icon={<BugOutlined />}
                    style={{ borderRadius: "8px", marginLeft: 20 }}
                  >
                    <span>80%</span>
                  </Tag>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card className="content-card__container">
                <div className="content-card__title">
                  <div className="content-card__icon">
                    <CalendarOutlined className="card-icon" />
                  </div>
                  <div className="content-card__text">Số thứ tự đã cấp</div>
                </div>
                <div className="card-percent d-flex justify-content-between align-items-center">
                  <div className="card-percent__number">4.221</div>
                  <div className="card-percent__icon d-flex align-items-">
                    <ArrowUpOutlined className="absolute" />
                    <span
                      style={{
                        fontSize: "8px",
                        lineHeight: "12px",
                        paddingLeft: "10px",
                      }}
                    >
                      42.1%
                    </span>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card className="content-card__container">
                <div className="content-card__title">
                  <div className="content-card__icon">
                    <CalendarOutlined className="card-icon" />
                  </div>
                  <div className="content-card__text">Số thứ tự đã cấp</div>
                </div>
                <div className="card-percent d-flex justify-content-between align-items-center">
                  <div className="card-percent__number">4.221</div>
                  <div className="card-percent__icon d-flex align-items-">
                    <ArrowUpOutlined className="absolute" />
                    <span
                      style={{
                        fontSize: "8px",
                        lineHeight: "12px",
                        paddingLeft: "10px",
                      }}
                    >
                      42.1%
                    </span>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card className="content-card__container">
                <div className="content-card__title">
                  <div className="content-card__icon">
                    <CalendarOutlined className="card-icon" />
                  </div>
                  <div className="content-card__text">Số thứ tự đã cấp</div>
                </div>
                <div className="card-percent d-flex justify-content-between align-items-center">
                  <div className="card-percent__number">4.221</div>
                  <div className="card-percent__icon d-flex align-items-">
                    <ArrowUpOutlined className="absolute" />
                    <span
                      style={{
                        fontSize: "8px",
                        lineHeight: "12px",
                        paddingLeft: "10px",
                      }}
                    >
                      42.1%
                    </span>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="chart"></div>
      </Content>

      <div className="sidebar-right">
        <Space>
          <Sider style={{ background: "#fff" }}>
            <Header
              style={{
                background: "#fff",
                paddingInline: "0",
                paddingLeft: "9%",
              }}
            >
              <div className="navbar-nav flex-row">
                <div className="nav-item dropdown d-none d-md-flex me-1 p-custom">
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
                      <div className="mt-1 text-user">Tran Tuan Kiet</div>
                    </div>
                  </div>
                  <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <Link to="/" className="dropdown-item">
                      Status
                    </Link>
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link to="/" className="dropdown-item">
                      Feedback
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="/" className="dropdown-item">
                      Settings
                    </Link>
                    <Link to="/" className="dropdown-item">
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
              <div className="sidebar-right__title mt-3">Tổng quan</div>
            </Header>
            <div className="d-flex justify-content-center align-items-center">
              {/* <Card></Card> */}
            </div>
          </Sider>
        </Space>
      </div>
    </>
  );
};

export default Dashboard;

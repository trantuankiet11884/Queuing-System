import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Badge, Calendar, Card, Col, Layout, Progress, Row } from "antd";

import { Link } from "react-router-dom";
import "./dashboard.css";
import { SiderBar } from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import CapSoThongBao from "../../components/Notifycation";
import ContentDashboard from "../../components/ContentDashboard";
import { fetchDevices } from "../../redux/slices/deviceSlice";
import { fetchServices } from "../../redux/slices/serviceSlice";
const { Header } = Layout;
const { Sider } = Layout;
const Dashboard: React.FC = () => {
  const dispatch: any = useDispatch();
  const [showComponent, setShowComponent] = useState(false);

  const [totalNumberService, setTotalNumberService] = useState(0);
  const [usedNumberService, setUsedNumberService] = useState(0);
  const [pendingNumberService, setPendingNumberService] = useState(0);
  const [skippedNumberService, setSkippedNumberService] = useState(0);

  const [totalDevice, setTotalDevice] = useState(0);
  const [activeDevice, setActiveDevice] = useState(0);
  const [isActiveDevice, setIsActiveDevice] = useState(0);

  const [totalService, setTotalService] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [isActiveService, setIsActiveService] = useState(0);

  const data = useSelector((state: RootState) => state.account.currentAccount);
  const dataCapSo = useSelector((state: RootState) => state.levelNum.capSo);
  const dataDevice = useSelector((state: RootState) => state.devices.devices);
  const dataService = useSelector((state: RootState) => state.service.services);

  useEffect(() => {
    const totalNumber = dataCapSo.length;

    const usedNumber = dataCapSo.filter(
      (item) => item.status === "Đã sử dụng"
    ).length;
    const pendingNumber = dataCapSo.filter(
      (item) => item.status === "Đang chờ"
    ).length;
    const skippedNumber = dataCapSo.filter(
      (item) => item.status === "Bỏ qua"
    ).length;

    setTotalNumberService(totalNumber);
    setUsedNumberService(usedNumber);
    setPendingNumberService(pendingNumber);
    setSkippedNumberService(skippedNumber);
  }, [dataCapSo]);

  useEffect(() => {
    dispatch(fetchServices());
    const totalService = dataService.length;
    const activeService = dataService.filter(
      (item) => item.isActive === true
    ).length;

    const isActiveService = dataService.filter(
      (item) => item.isActive === false
    ).length;

    setTotalService(totalService);
    setActiveService(activeService);
    setIsActiveService(isActiveService);
  }, [dispatch, dataService]);

  useEffect(() => {
    dispatch(fetchDevices());
    const totalDevice = dataDevice.length;
    const activeDevice = dataDevice.filter(
      (item) => item.isActive === true
    ).length;

    const isActiveDevice = dataDevice.filter(
      (item) => item.isActive === false
    ).length;

    setTotalDevice(totalDevice);
    setActiveDevice(activeDevice);
    setIsActiveDevice(isActiveDevice);
  }, [dispatch, dataDevice]);

  const handleClick = () => {
    setShowComponent(!showComponent);
  };

  const totalPercentCapSo = (usedNumberService / totalNumberService) * 100;
  const totalPercentService = (activeService / totalService) * 100;
  const totalPercentDevice = (activeDevice / totalDevice) * 100;

  return (
    <>
      <SiderBar />

      <div className="main d-flex flex-column ">
        <div>
          <ContentDashboard />
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
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="16" fill="#FFF2E7" />
                  <path
                    d="M22.1167 18.0753L21.2833 16.692C21.1083 16.3837 20.95 15.8003 20.95 15.4587V13.3503C20.95 11.392 19.8 9.70033 18.1417 8.90866C17.7083 8.14199 16.9083 7.66699 15.9917 7.66699C15.0833 7.66699 14.2667 8.15866 13.8333 8.93366C12.2083 9.74199 11.0833 11.417 11.0833 13.3503V15.4587C11.0833 15.8003 10.925 16.3837 10.75 16.6837L9.90833 18.0753C9.57499 18.6337 9.49999 19.2503 9.70833 19.817C9.90833 20.3753 10.3833 20.8087 11 21.017C12.6167 21.567 14.3167 21.8337 16.0167 21.8337C17.7167 21.8337 19.4167 21.567 21.0333 21.0253C21.6167 20.8337 22.0667 20.392 22.2833 19.817C22.5 19.242 22.4417 18.6087 22.1167 18.0753Z"
                    fill="#FFAC6A"
                  />
                  <path
                    d="M18.3584 22.6753C18.0084 23.642 17.0834 24.3337 16 24.3337C15.3417 24.3337 14.6917 24.067 14.2334 23.592C13.9667 23.342 13.7667 23.0087 13.65 22.667C13.7584 22.6837 13.8667 22.692 13.9834 22.7087C14.175 22.7337 14.375 22.7587 14.575 22.7753C15.05 22.817 15.5334 22.842 16.0167 22.842C16.4917 22.842 16.9667 22.817 17.4334 22.7753C17.6084 22.7587 17.7834 22.7503 17.95 22.7253C18.0834 22.7087 18.2167 22.692 18.3584 22.6753Z"
                    fill="#FFAC6A"
                  />
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
            <div className="sidebar-right__title mt-1">Tổng quan</div>
          </Header>
          <div className="d-flex flex-column justify-content-center align-items-start tcard">
            <div>
              <Card className="card-main">
                <Link to={`/devices`}>
                  <Row className="d-flex justify-content-between">
                    <Col>
                      <div
                        className="mt-2"
                        style={{ width: "4rem", height: "4rem" }}
                      >
                        <Progress
                          type="circle"
                          percent={Number(totalPercentDevice.toFixed(0))}
                          size={"small"}
                          strokeColor="#FF7506"
                        ></Progress>
                      </div>
                    </Col>
                    <Col>
                      <p className="card-percent__number">{totalDevice}</p>
                      <p>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M3.75663 1.16699H10.2375C12.3141 1.16699 12.8333 1.68616 12.8333 3.75699V7.44949C12.8333 9.52616 12.3141 10.0395 10.2433 10.0395H3.75663C1.68579 10.0453 1.16663 9.52616 1.16663 7.45533V3.75699C1.16663 1.68616 1.68579 1.16699 3.75663 1.16699Z"
                              stroke="#FF7506"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M7 10.0449V12.8333"
                              stroke="#FF7506"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M1.16663 7.58301H12.8333"
                              stroke="#FF7506"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M4.375 12.833H9.625"
                              stroke="#FF7506"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                        &nbsp; <span className="text-device">Thiết bị</span>
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <Badge status="warning" text="Hoạt động" />
                        &nbsp;
                        <span className="number-device">{activeDevice}</span>
                      </p>
                      <p>
                        <Badge status="default" text="Ngưng hoạt động" />
                        &nbsp;
                        <span className="number-device">{isActiveDevice}</span>
                      </p>
                    </Col>
                  </Row>
                </Link>
              </Card>
            </div>
            <div className="py-2">
              <Card className="card-main">
                <Link to={`/services`}>
                  <Row className="d-flex justify-content-between">
                    <Col>
                      <div
                        className="mt-2"
                        style={{ width: "4rem", height: "4rem" }}
                      >
                        <Progress
                          type="circle"
                          percent={Number(totalPercentService.toFixed(0))}
                          size={"small"}
                          strokeColor="#4277FF"
                        ></Progress>
                      </div>
                    </Col>
                    <Col>
                      <p className="card-percent__number">{totalService}</p>
                      <p>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                          >
                            <path
                              d="M14.7704 5.7304C14.7704 7.04284 14.0591 8.22267 12.9266 9.04368C12.8874 9.07098 12.8658 9.11778 12.8639 9.16459L12.8149 10.4419C12.809 10.6135 12.6189 10.713 12.4739 10.6213L11.3864 9.94074C11.3864 9.94074 11.3864 9.94074 11.3845 9.94074C11.3218 9.89978 11.2453 9.88808 11.1748 9.90954C10.5282 10.1104 9.82472 10.2216 9.08797 10.2216C9.07817 10.2216 9.06837 10.2216 9.05857 10.2216C9.07817 10.0928 9.08797 9.96219 9.08797 9.82958C9.08797 7.99841 7.2108 6.51436 4.89472 6.51436C4.41857 6.51436 3.96201 6.57676 3.53485 6.69182C3.44863 6.38175 3.40356 6.05802 3.40356 5.7265C3.40356 3.24398 5.94695 1.2334 9.08601 1.2334C12.227 1.2373 14.7704 3.24983 14.7704 5.7304Z"
                              stroke="#4277FF"
                              stroke-width="1.10526"
                              stroke-miterlimit="10"
                            />
                            <path
                              d="M3.53675 6.69531C1.88884 7.14189 0.703369 8.37828 0.703369 9.83308C0.703369 10.8003 1.22851 11.6721 2.06324 12.2785C2.09263 12.3 2.1083 12.3331 2.11026 12.3682L2.14553 13.3102C2.14945 13.4369 2.29053 13.5091 2.3983 13.4428L3.20168 12.9396C3.20756 12.9357 3.2154 12.9299 3.22128 12.926C3.25067 12.9026 3.28986 12.8948 3.32513 12.9065C3.81108 13.0625 4.34013 13.1483 4.89662 13.1483C7.04419 13.1483 8.81555 11.871 9.06048 10.2251"
                              stroke="#4277FF"
                              stroke-width="1.10526"
                              stroke-miterlimit="10"
                            />
                          </svg>
                        </span>
                        &nbsp;
                        <span className="text-service">Dịch vụ</span>
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <Badge status="processing" text="Hoạt động" />
                        &nbsp;
                        <span className="number-service">{activeService}</span>
                      </p>
                      <p>
                        <Badge status="default" text="Ngưng hoạt động" />
                        &nbsp;
                        <span className="number-service">
                          {isActiveService}
                        </span>
                      </p>
                    </Col>
                  </Row>
                </Link>
              </Card>
            </div>
            <div>
              <Card className="card-main">
                <Link to={`/numbers`}>
                  <Row className="d-flex justify-content-between">
                    <Col>
                      <div
                        className="mt-2"
                        style={{ width: "4rem", height: "4rem" }}
                      >
                        <Progress
                          type="circle"
                          percent={Number(totalPercentCapSo.toFixed(0))}
                          size={"small"}
                          strokeColor=" #35C75A"
                        ></Progress>
                      </div>
                    </Col>
                    <Col>
                      <p className="card-percent__number">
                        {totalNumberService}
                      </p>
                      <p className="text-capso">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_201_18603)">
                              <path
                                d="M1.16663 9.91699L6.99996 12.8337L12.8333 9.91699"
                                stroke="#35C75A"
                                stroke-width="1.16667"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M1.16663 7L6.99996 9.91667L12.8333 7"
                                stroke="#35C75A"
                                stroke-width="1.16667"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6.99996 1.16699L1.16663 4.08366L6.99996 7.00033L12.8333 4.08366L6.99996 1.16699Z"
                                stroke="#35C75A"
                                stroke-width="1.16667"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_201_18603">
                                <rect width="14" height="14" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        &nbsp;Cấp số
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <Badge status="success" text="Đã sử dụng" />
                        &nbsp;
                        <span className="number-capso">
                          {usedNumberService}
                        </span>
                      </p>
                      <p>
                        <Badge status="default" text="Đang chờ" />
                        &nbsp;
                        <span className="number-capso">
                          {pendingNumberService}
                        </span>
                      </p>
                      <p>
                        <Badge status="error" text="Bỏ qua" />
                        &nbsp;
                        <span className="number-capso">
                          {skippedNumberService}
                        </span>
                      </p>
                    </Col>
                  </Row>
                </Link>
              </Card>
            </div>
          </div>
          <div className="calendar"></div>
        </Sider>
      </div>
    </>
  );
};

export default Dashboard;

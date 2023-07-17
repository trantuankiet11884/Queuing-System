import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Card, Col, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  CalendarOutlined,
  ArrowUpOutlined,
  BugOutlined,
} from "@ant-design/icons";
import { Chart } from "chart.js";
import { fetchCapSo } from "../redux/slices/capsoSlice";

const { Title, Text } = Typography;

const ContentDashboard = () => {
  const [totalNumberService, setTotalNumberService] = useState(0);
  const [usedNumberService, setUsedNumberService] = useState(0);
  const [pendingNumberService, setPendingNumberService] = useState(0);
  const [skippedNumberService, setSkippedNumberService] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [numberServiceCount, setNumberServiceCount] = useState(0);
  const dispatch: any = useDispatch();

  const dataCapSo = useSelector((state: RootState) => state.levelNum.capSo);

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

  const totalNumberServicee = dataCapSo.length;
  const usedNumberPercentage = (usedNumberService / totalNumberServicee) * 100;
  const pendingNumberPercentage =
    (pendingNumberService / totalNumberServicee) * 100;
  const skippedNumberPercentage =
    (skippedNumberService / totalNumberServicee) * 100;

  return (
    <div className="">
      <Space direction="vertical">
        <Row style={{ minHeight: "70px" }} align={"middle"}>
          <Title level={5} style={{ margin: "0 24px", color: "#ff9138" }}>
            Dashboard
          </Title>
        </Row>
        <Row>
          <Title level={4} style={{ margin: "0 24px", color: "#ff9138" }}>
            Biểu đồ cấp số
          </Title>
        </Row>
      </Space>
      <Row gutter={24} className="">
        <Col span={6}>
          <Link to={`/numbers`}>
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
                <div className="card-percent__number">{totalNumberService}</div>
                <div className="card-percent__p">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    className="per-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.80099 9.52148C6.70154 9.52148 6.60615 9.48198 6.53583 9.41165C6.4655 9.34132 6.42599 9.24594 6.42599 9.14648L6.42599 4.80173L4.81649 6.41198C4.78163 6.44685 4.74024 6.47451 4.69468 6.49338C4.64913 6.51225 4.6003 6.52196 4.55099 6.52196C4.50169 6.52196 4.45286 6.51225 4.40731 6.49338C4.36175 6.47451 4.32036 6.44685 4.28549 6.41198C4.25063 6.37712 4.22297 6.33573 4.2041 6.29017C4.18523 6.24462 4.17552 6.19579 4.17552 6.14648C4.17552 6.09718 4.18523 6.04835 4.2041 6.0028C4.22297 5.95724 4.25063 5.91585 4.28549 5.88098L6.53549 3.63098C6.57033 3.59606 6.61171 3.56835 6.65727 3.54945C6.70283 3.53054 6.75167 3.52081 6.80099 3.52081C6.85032 3.52081 6.89916 3.53055 6.94472 3.54945C6.99028 3.56835 7.03166 3.59606 7.06649 3.63098L9.31649 5.88098C9.35136 5.91585 9.37902 5.95724 9.39789 6.0028C9.41676 6.04835 9.42647 6.09718 9.42647 6.14648C9.42647 6.19579 9.41676 6.24462 9.39789 6.29017C9.37902 6.33573 9.35136 6.37712 9.31649 6.41198C9.24608 6.4824 9.15058 6.52196 9.05099 6.52196C9.00169 6.52196 8.95286 6.51225 8.90731 6.49338C8.86175 6.47451 8.82036 6.44685 8.78549 6.41198L7.17599 4.80173L7.17599 9.14648C7.17599 9.24594 7.13649 9.34132 7.06616 9.41165C6.99583 9.48198 6.90045 9.52148 6.80099 9.52148Z"
                      fill="#FF9138"
                    />
                  </svg>
                  <span className="percent">32.2%</span>
                </div>
              </div>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Link to={`/numbers`}>
            <Card className="content-card__container">
              <div className="content-card__title">
                <div className="content-card__icon">
                  <CalendarOutlined className="card-icon" />
                </div>
                <div className="content-card__text">Số thứ tự đã sử dụng</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="card-percent__number">{usedNumberService}</div>
                <div className="card-percent__p">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    className="per-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.80099 9.52148C6.70154 9.52148 6.60615 9.48198 6.53583 9.41165C6.4655 9.34132 6.42599 9.24594 6.42599 9.14648L6.42599 4.80173L4.81649 6.41198C4.78163 6.44685 4.74024 6.47451 4.69468 6.49338C4.64913 6.51225 4.6003 6.52196 4.55099 6.52196C4.50169 6.52196 4.45286 6.51225 4.40731 6.49338C4.36175 6.47451 4.32036 6.44685 4.28549 6.41198C4.25063 6.37712 4.22297 6.33573 4.2041 6.29017C4.18523 6.24462 4.17552 6.19579 4.17552 6.14648C4.17552 6.09718 4.18523 6.04835 4.2041 6.0028C4.22297 5.95724 4.25063 5.91585 4.28549 5.88098L6.53549 3.63098C6.57033 3.59606 6.61171 3.56835 6.65727 3.54945C6.70283 3.53054 6.75167 3.52081 6.80099 3.52081C6.85032 3.52081 6.89916 3.53055 6.94472 3.54945C6.99028 3.56835 7.03166 3.59606 7.06649 3.63098L9.31649 5.88098C9.35136 5.91585 9.37902 5.95724 9.39789 6.0028C9.41676 6.04835 9.42647 6.09718 9.42647 6.14648C9.42647 6.19579 9.41676 6.24462 9.39789 6.29017C9.37902 6.33573 9.35136 6.37712 9.31649 6.41198C9.24608 6.4824 9.15058 6.52196 9.05099 6.52196C9.00169 6.52196 8.95286 6.51225 8.90731 6.49338C8.86175 6.47451 8.82036 6.44685 8.78549 6.41198L7.17599 4.80173L7.17599 9.14648C7.17599 9.24594 7.13649 9.34132 7.06616 9.41165C6.99583 9.48198 6.90045 9.52148 6.80099 9.52148Z"
                      fill="#FF9138"
                    />
                  </svg>
                  <span className="percent">{`${usedNumberPercentage.toFixed(
                    2
                  )}%`}</span>
                </div>
              </div>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Link to={`/numbers`}>
            <Card className="content-card__container">
              <div className="content-card__title">
                <div className="content-card__icon">
                  <CalendarOutlined className="card-icon" />
                </div>
                <div className="content-card__text">Số thứ tự đang chờ</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="card-percent__number">
                  {pendingNumberService}
                </div>
                <div className="card-percent__p">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    className="per-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.80099 9.52148C6.70154 9.52148 6.60615 9.48198 6.53583 9.41165C6.4655 9.34132 6.42599 9.24594 6.42599 9.14648L6.42599 4.80173L4.81649 6.41198C4.78163 6.44685 4.74024 6.47451 4.69468 6.49338C4.64913 6.51225 4.6003 6.52196 4.55099 6.52196C4.50169 6.52196 4.45286 6.51225 4.40731 6.49338C4.36175 6.47451 4.32036 6.44685 4.28549 6.41198C4.25063 6.37712 4.22297 6.33573 4.2041 6.29017C4.18523 6.24462 4.17552 6.19579 4.17552 6.14648C4.17552 6.09718 4.18523 6.04835 4.2041 6.0028C4.22297 5.95724 4.25063 5.91585 4.28549 5.88098L6.53549 3.63098C6.57033 3.59606 6.61171 3.56835 6.65727 3.54945C6.70283 3.53054 6.75167 3.52081 6.80099 3.52081C6.85032 3.52081 6.89916 3.53055 6.94472 3.54945C6.99028 3.56835 7.03166 3.59606 7.06649 3.63098L9.31649 5.88098C9.35136 5.91585 9.37902 5.95724 9.39789 6.0028C9.41676 6.04835 9.42647 6.09718 9.42647 6.14648C9.42647 6.19579 9.41676 6.24462 9.39789 6.29017C9.37902 6.33573 9.35136 6.37712 9.31649 6.41198C9.24608 6.4824 9.15058 6.52196 9.05099 6.52196C9.00169 6.52196 8.95286 6.51225 8.90731 6.49338C8.86175 6.47451 8.82036 6.44685 8.78549 6.41198L7.17599 4.80173L7.17599 9.14648C7.17599 9.24594 7.13649 9.34132 7.06616 9.41165C6.99583 9.48198 6.90045 9.52148 6.80099 9.52148Z"
                      fill="#FF9138"
                    />
                  </svg>
                  <span className="percent">{`${pendingNumberPercentage.toFixed(
                    2
                  )}%`}</span>
                </div>
              </div>
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Link to={`/numbers`}>
            <Card className="content-card__container">
              <div className="content-card__title">
                <div className="content-card__icon">
                  <CalendarOutlined className="card-icon" />
                </div>
                <div className="content-card__text">Số thứ tự đã bỏ qua</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="card-percent__number">
                  {skippedNumberService}
                </div>
                <div className="card-percent__p">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    className="per-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.80099 9.52148C6.70154 9.52148 6.60615 9.48198 6.53583 9.41165C6.4655 9.34132 6.42599 9.24594 6.42599 9.14648L6.42599 4.80173L4.81649 6.41198C4.78163 6.44685 4.74024 6.47451 4.69468 6.49338C4.64913 6.51225 4.6003 6.52196 4.55099 6.52196C4.50169 6.52196 4.45286 6.51225 4.40731 6.49338C4.36175 6.47451 4.32036 6.44685 4.28549 6.41198C4.25063 6.37712 4.22297 6.33573 4.2041 6.29017C4.18523 6.24462 4.17552 6.19579 4.17552 6.14648C4.17552 6.09718 4.18523 6.04835 4.2041 6.0028C4.22297 5.95724 4.25063 5.91585 4.28549 5.88098L6.53549 3.63098C6.57033 3.59606 6.61171 3.56835 6.65727 3.54945C6.70283 3.53054 6.75167 3.52081 6.80099 3.52081C6.85032 3.52081 6.89916 3.53055 6.94472 3.54945C6.99028 3.56835 7.03166 3.59606 7.06649 3.63098L9.31649 5.88098C9.35136 5.91585 9.37902 5.95724 9.39789 6.0028C9.41676 6.04835 9.42647 6.09718 9.42647 6.14648C9.42647 6.19579 9.41676 6.24462 9.39789 6.29017C9.37902 6.33573 9.35136 6.37712 9.31649 6.41198C9.24608 6.4824 9.15058 6.52196 9.05099 6.52196C9.00169 6.52196 8.95286 6.51225 8.90731 6.49338C8.86175 6.47451 8.82036 6.44685 8.78549 6.41198L7.17599 4.80173L7.17599 9.14648C7.17599 9.24594 7.13649 9.34132 7.06616 9.41165C6.99583 9.48198 6.90045 9.52148 6.80099 9.52148Z"
                      fill="#FF9138"
                    />
                  </svg>
                  <span className="percent">{`${skippedNumberPercentage.toFixed(
                    2
                  )}%`}</span>
                </div>
              </div>
            </Card>
          </Link>
        </Col>
      </Row>
      <div className="chart">
        <canvas ref={canvasRef} id="myChart" />
      </div>
    </div>
  );
};

export default ContentDashboard;

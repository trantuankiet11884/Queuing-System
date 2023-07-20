import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Card, Col, Row, Select, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import "moment/locale/vi";
import { Chart } from "chart.js";
import { fetchCapSo } from "../redux/slices/capsoSlice";
import moment from "moment";
moment.locale("vi");
const { Title } = Typography;
const { Option } = Select;

const ContentDashboard = () => {
  const [totalNumberService, setTotalNumberService] = useState(0);
  const [usedNumberService, setUsedNumberService] = useState(0);
  const [pendingNumberService, setPendingNumberService] = useState(0);
  const [skippedNumberService, setSkippedNumberService] = useState(0);
  const [chartPeriod, setChartPeriod] = useState("day");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [numberServiceCount, setNumberServiceCount] = useState(0);
  const dispatch: any = useDispatch();

  const dataCapSo = useSelector((state: RootState) => state.levelNum.capSo);

  const grantTimeCounts = dataCapSo.reduce((counts: any, item) => {
    const date = moment(item.grantTime, "HH:mm DD/MM/YYYY").format("DD");
    counts[date] = (counts[date] || 0) + 1;
    return counts;
  }, {});

  const getChartLabels = () => Object.keys(grantTimeCounts);
  const getChartData = () => Object.values(grantTimeCounts) as number[];

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
            labels: getChartLabels(),
            datasets: [
              {
                label: "Number of occurrences",
                data: getChartData(),
                backgroundColor: "#CEDDFF",
                borderColor: "#5185F7",
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: "#5185F7",
                pointHoverRadius: 6,
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
  }, [dispatch, chartPeriod]);

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

  const handleChartPeriodChange = (value: string) => {
    setChartPeriod(value);
  };

  const handleCardClick = (status: string) => {
    let filter = "";

    if (status === "Đã sử dụng") {
      filter = "used";
    } else if (status === "Đang chờ") {
      filter = "pending";
    } else if (status === "Bỏ qua") {
      filter = "skipped";
    }

    window.location.href = `/numbers?filter=${filter}`;
  };

  return (
    <div className="">
      <Space direction="vertical">
        <Row style={{ minHeight: "40px" }} align={"middle"}>
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
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.15"
                      cx="24"
                      cy="24"
                      r="23.5"
                      fill="#6695FB"
                      stroke="#DADADA"
                    />
                    <g clip-path="url(#clip0_209_18730)">
                      <path
                        d="M17.25 12C17.4489 12 17.6397 12.079 17.7803 12.2197C17.921 12.3603 18 12.5511 18 12.75V13.5H30V12.75C30 12.5511 30.079 12.3603 30.2197 12.2197C30.3603 12.079 30.5511 12 30.75 12C30.9489 12 31.1397 12.079 31.2803 12.2197C31.421 12.3603 31.5 12.5511 31.5 12.75V13.5H33C33.7956 13.5 34.5587 13.8161 35.1213 14.3787C35.6839 14.9413 36 15.7044 36 16.5V33C36 33.7956 35.6839 34.5587 35.1213 35.1213C34.5587 35.6839 33.7956 36 33 36H15C14.2044 36 13.4413 35.6839 12.8787 35.1213C12.3161 34.5587 12 33.7956 12 33V16.5C12 15.7044 12.3161 14.9413 12.8787 14.3787C13.4413 13.8161 14.2044 13.5 15 13.5H16.5V12.75C16.5 12.5511 16.579 12.3603 16.7197 12.2197C16.8603 12.079 17.0511 12 17.25 12V12ZM13.5 18V33C13.5 33.3978 13.658 33.7794 13.9393 34.0607C14.2206 34.342 14.6022 34.5 15 34.5H33C33.3978 34.5 33.7794 34.342 34.0607 34.0607C34.342 33.7794 34.5 33.3978 34.5 33V18H13.5Z"
                        fill="#6493F9"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_209_18730">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(12 12)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="content-card__text mx-1 mt-1">
                  Số thứ tự đã cấp
                </div>
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
          <Card
            className="content-card__container"
            onClick={() => handleCardClick("Đã sử dụng")}
          >
            <div className="content-card__title">
              <div className="content-card__icon">
                <svg
                  width="49"
                  height="48"
                  viewBox="0 0 49 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="24.75"
                    cy="24"
                    r="23"
                    fill="#35C75A"
                    stroke="#35C75A"
                    stroke-width="2"
                  />
                  <g clip-path="url(#clip0_209_18861)">
                    <path
                      d="M29.031 22.7194C29.1008 22.789 29.1563 22.8718 29.1941 22.9629C29.2319 23.054 29.2513 23.1517 29.2513 23.2504C29.2513 23.349 29.2319 23.4467 29.1941 23.5378C29.1563 23.6289 29.1008 23.7117 29.031 23.7814L24.531 28.2814C24.4613 28.3512 24.3786 28.4066 24.2875 28.4444C24.1963 28.4822 24.0987 28.5017 24 28.5017C23.9014 28.5017 23.8037 28.4822 23.7126 28.4444C23.6214 28.4066 23.5387 28.3512 23.469 28.2814L21.219 26.0314C21.1493 25.9616 21.094 25.8788 21.0562 25.7877C21.0185 25.6966 20.9991 25.599 20.9991 25.5004C20.9991 25.4017 21.0185 25.3041 21.0562 25.213C21.094 25.1219 21.1493 25.0391 21.219 24.9694C21.3598 24.8285 21.5508 24.7494 21.75 24.7494C21.8486 24.7494 21.9463 24.7688 22.0374 24.8066C22.1285 24.8443 22.2113 24.8996 22.281 24.9694L24 26.6899L27.969 22.7194C28.0387 22.6495 28.1214 22.5941 28.2126 22.5563C28.3037 22.5185 28.4014 22.499 28.5 22.499C28.5987 22.499 28.6963 22.5185 28.7875 22.5563C28.8786 22.5941 28.9613 22.6495 29.031 22.7194Z"
                      fill="#35C75A"
                    />
                    <path
                      d="M18 12C18.1989 12 18.3897 12.079 18.5303 12.2197C18.671 12.3603 18.75 12.5511 18.75 12.75V13.5H30.75V12.75C30.75 12.5511 30.829 12.3603 30.9697 12.2197C31.1103 12.079 31.3011 12 31.5 12C31.6989 12 31.8897 12.079 32.0303 12.2197C32.171 12.3603 32.25 12.5511 32.25 12.75V13.5H33.75C34.5456 13.5 35.3087 13.8161 35.8713 14.3787C36.4339 14.9413 36.75 15.7044 36.75 16.5V33C36.75 33.7956 36.4339 34.5587 35.8713 35.1213C35.3087 35.6839 34.5456 36 33.75 36H15.75C14.9544 36 14.1913 35.6839 13.6287 35.1213C13.0661 34.5587 12.75 33.7956 12.75 33V16.5C12.75 15.7044 13.0661 14.9413 13.6287 14.3787C14.1913 13.8161 14.9544 13.5 15.75 13.5H17.25V12.75C17.25 12.5511 17.329 12.3603 17.4697 12.2197C17.6103 12.079 17.8011 12 18 12V12ZM14.25 18V33C14.25 33.3978 14.408 33.7794 14.6893 34.0607C14.9706 34.342 15.3522 34.5 15.75 34.5H33.75C34.1478 34.5 34.5294 34.342 34.8107 34.0607C35.092 33.7794 35.25 33.3978 35.25 33V18H14.25Z"
                      fill="#35C75A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_209_18861">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(12.75 12)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                &nbsp;
              </div>
              <div className="content-card__text mx-1 mt-1">
                Số thứ tự đã sử dụng
              </div>
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
        </Col>
        <Col span={6}>
          <Card
            className="content-card__container"
            onClick={() => handleCardClick("Đang chờ")}
          >
            <div className="content-card__title">
              <div className="content-card__icon">
                <svg
                  width="49"
                  height="48"
                  viewBox="0 0 49 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="24.25"
                    cy="24"
                    r="23.5"
                    fill="#FFAC6A"
                    stroke="#DADADA"
                  />
                  <path
                    d="M31.2505 20.9625L32.155 20.058C32.2767 19.9378 32.4308 19.8555 32.5984 19.8211C32.766 19.7868 32.94 19.8019 33.0992 19.8645L34.2017 20.304C34.3627 20.3696 34.5007 20.4814 34.5983 20.6252C34.6958 20.7691 34.7486 20.9387 34.75 21.1125V23.1315C34.748 23.3637 34.6539 23.5856 34.4884 23.7485C34.3229 23.9113 34.0995 24.0018 33.8672 24L33.8297 23.9985C26.1077 23.5185 24.55 16.977 24.2552 14.4735C24.2425 14.3591 24.2525 14.2434 24.2845 14.1329C24.3165 14.0224 24.37 13.9193 24.4418 13.8294C24.5137 13.7396 24.6026 13.6648 24.7034 13.6093C24.8042 13.5538 24.9149 13.5187 25.0292 13.506C25.0631 13.502 25.0972 13.5 25.1312 13.5H27.0812C27.2552 13.5006 27.4249 13.5532 27.5687 13.6511C27.7125 13.7489 27.8238 13.8875 27.8882 14.049L28.3285 15.1515C28.3932 15.3102 28.4098 15.4845 28.376 15.6526C28.3423 15.8207 28.2597 15.9751 28.1387 16.0965L27.2342 17.001C27.2342 17.001 27.7547 20.526 31.2505 20.9625Z"
                    fill="#FFAC6A"
                  />
                  <path
                    d="M24.25 34.5H22.75V30.75C22.7494 30.1534 22.5122 29.5815 22.0903 29.1597C21.6685 28.7378 21.0966 28.5006 20.5 28.5H17.5C16.9034 28.5006 16.3315 28.7378 15.9097 29.1597C15.4878 29.5815 15.2506 30.1534 15.25 30.75V34.5H13.75V30.75C13.7512 29.7558 14.1467 28.8027 14.8497 28.0997C15.5527 27.3967 16.5058 27.0012 17.5 27H20.5C21.4942 27.0012 22.4473 27.3967 23.1503 28.0997C23.8533 28.8027 24.2488 29.7558 24.25 30.75V34.5Z"
                    fill="#FFAC6A"
                  />
                  <path
                    d="M19 19.5C19.445 19.5 19.88 19.632 20.25 19.8792C20.62 20.1264 20.9084 20.4778 21.0787 20.889C21.249 21.3001 21.2936 21.7525 21.2068 22.189C21.12 22.6254 20.9057 23.0263 20.591 23.341C20.2763 23.6557 19.8754 23.87 19.439 23.9568C19.0025 24.0436 18.5501 23.999 18.139 23.8287C17.7278 23.6584 17.3764 23.37 17.1292 23C16.882 22.63 16.75 22.195 16.75 21.75C16.75 21.1533 16.9871 20.581 17.409 20.159C17.831 19.7371 18.4033 19.5 19 19.5ZM19 18C18.2583 18 17.5333 18.2199 16.9166 18.632C16.2999 19.044 15.8193 19.6297 15.5355 20.3149C15.2516 21.0002 15.1774 21.7542 15.3221 22.4816C15.4668 23.209 15.8239 23.8772 16.3484 24.4017C16.8728 24.9261 17.541 25.2833 18.2684 25.4279C18.9958 25.5726 19.7498 25.4984 20.4351 25.2145C21.1203 24.9307 21.706 24.4501 22.118 23.8334C22.5301 23.2167 22.75 22.4917 22.75 21.75C22.75 21.2575 22.653 20.7699 22.4646 20.3149C22.2761 19.86 21.9999 19.4466 21.6517 19.0983C21.3034 18.7501 20.89 18.4739 20.4351 18.2855C19.9801 18.097 19.4925 18 19 18Z"
                    fill="#FFAC6A"
                  />
                </svg>
              </div>
              <div className="content-card__text mx-1 mt-1">
                Số thứ tự đang chờ
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="card-percent__number">{pendingNumberService}</div>
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
        </Col>
        <Col span={6}>
          <Card
            className="content-card__container"
            onClick={() => handleCardClick("Bỏ qua")}
          >
            <div className="content-card__title">
              <div className="content-card__icon">
                <svg
                  width="49"
                  height="48"
                  viewBox="0 0 49 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="24.5"
                    cy="24"
                    r="23.5"
                    fill="#F86D6D"
                    stroke="#DADADA"
                  />
                  <path
                    d="M24.26 18.15C24.2819 18.105 24.3161 18.0671 24.3585 18.0406C24.4009 18.0141 24.45 18 24.5 18C24.5501 18 24.5991 18.0141 24.6415 18.0406C24.684 18.0671 24.7181 18.105 24.74 18.15L25.691 20.0775C25.7101 20.1165 25.7383 20.1503 25.7733 20.1759C25.8084 20.2015 25.8491 20.2182 25.892 20.2245L28.022 20.5335C28.2395 20.565 28.328 20.8335 28.169 20.988L26.63 22.4895C26.599 22.5198 26.5758 22.5572 26.5624 22.5985C26.5491 22.6398 26.546 22.6838 26.5535 22.7265L26.9165 24.8475C26.9247 24.8965 26.919 24.9468 26.9002 24.9927C26.8813 25.0386 26.85 25.0784 26.8098 25.1075C26.7696 25.1367 26.7221 25.154 26.6726 25.1576C26.6231 25.1613 26.5735 25.151 26.5295 25.128L24.6245 24.126C24.5863 24.106 24.5439 24.0956 24.5008 24.0956C24.4577 24.0956 24.4152 24.106 24.377 24.126L22.472 25.128C22.4281 25.1506 22.3787 25.1605 22.3294 25.1567C22.2801 25.1529 22.2329 25.1355 22.1929 25.1064C22.153 25.0773 22.1219 25.0377 22.1031 24.992C22.0843 24.9463 22.0786 24.8963 22.0865 24.8475L22.4495 22.7265C22.4572 22.6839 22.4543 22.64 22.4413 22.5987C22.4282 22.5575 22.4053 22.52 22.3745 22.4895L20.8295 20.988C20.7941 20.9533 20.7691 20.9093 20.7573 20.8612C20.7455 20.813 20.7473 20.7625 20.7625 20.7153C20.7778 20.6681 20.8059 20.6261 20.8437 20.594C20.8815 20.5619 20.9275 20.5409 20.9765 20.5335L23.1065 20.2245C23.1494 20.2182 23.1902 20.2015 23.2252 20.1759C23.2602 20.1503 23.2885 20.1165 23.3075 20.0775L24.26 18.15Z"
                    fill="#F86D6D"
                  />
                  <path
                    d="M15.5 15C15.5 14.2044 15.8161 13.4413 16.3787 12.8787C16.9413 12.3161 17.7044 12 18.5 12H30.5C31.2956 12 32.0587 12.3161 32.6213 12.8787C33.1839 13.4413 33.5 14.2044 33.5 15V35.25C33.4999 35.3857 33.4631 35.5188 33.3933 35.6351C33.3236 35.7515 33.2236 35.8468 33.104 35.9108C32.9844 35.9748 32.8497 36.0052 32.7142 35.9988C32.5787 35.9923 32.4474 35.9492 32.3345 35.874L24.5 31.6515L16.6655 35.874C16.5526 35.9492 16.4213 35.9923 16.2858 35.9988C16.1503 36.0052 16.0156 35.9748 15.896 35.9108C15.7764 35.8468 15.6764 35.7515 15.6067 35.6351C15.5369 35.5188 15.5001 35.3857 15.5 35.25V15ZM18.5 13.5C18.1022 13.5 17.7206 13.658 17.4393 13.9393C17.158 14.2206 17 14.6022 17 15V33.849L24.0845 30.126C24.2076 30.0441 24.3521 30.0004 24.5 30.0004C24.6479 30.0004 24.7924 30.0441 24.9155 30.126L32 33.849V15C32 14.6022 31.842 14.2206 31.5607 13.9393C31.2794 13.658 30.8978 13.5 30.5 13.5H18.5Z"
                    fill="#F86D6D"
                  />
                </svg>
              </div>
              <div className="content-card__text mx-1 mt-1">
                Số thứ tự đã bỏ qua
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="card-percent__number">{skippedNumberService}</div>
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
        </Col>
      </Row>
      <Select
        defaultValue="day"
        onChange={handleChartPeriodChange}
        className="chart-period__select--custom"
      >
        <Option value="day">Ngày</Option>
        <Option value="week">Tuần</Option>
        <Option value="month">Tháng</Option>
      </Select>
      <div className="chart">
        <canvas ref={canvasRef} id="myChart" />
      </div>
    </div>
  );
};

export default ContentDashboard;

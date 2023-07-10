import { Button, Card, Modal, Select, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { SiderBar } from "../../components/Sidebar";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import moment from "moment";

interface CapSoMoi {
  numberService: number;
  nameCustomer: string;
  nameDevice: string;
  nameService: string;
  grantTime: string;
  expiry: string;
  status: string;
}

const CapSoMoi = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [capSo, setCapSo] = useState<CapSoMoi | null>(null);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const showModal = async () => {
    const servicesRef = firestore.collection("capso");
    const snapshot = await servicesRef
      .where("nameService", "==", selectedService)
      .get();
    let numberService = 1;
    if (!snapshot.empty) {
      const services = snapshot.docs.map((doc) => doc.data());
      numberService =
        services.reduce((max, service) => {
          return Math.max(max, service.numberService);
        }, 0) + 1;
    }

    const nameDevice = Math.random() < 0.5 ? "Kiosk" : "Hệ thống";
    const grantTime = moment().format("HH:mm DD/MM/YYYY");
    const expiry = moment().add(1, "day").format("HH:mm DD/MM/YYYY");
    const status = ["Đã sử dụng", "Đang chờ", "Bỏ qua"][
      Math.floor(Math.random() * 3)
    ];

    const capSo: CapSoMoi = {
      numberService,
      nameCustomer: "",
      nameDevice,
      nameService: selectedService,
      grantTime,
      expiry,
      status,
    };

    setCapSo(capSo); // update capSo state variable with generated capSo object

    const capSoRef = firestore.collection("capso");
    capSoRef
      .add(capSo)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  return (
    <>
      <SiderBar />

      <Content>
        <HeaderPage label="Cấp số mới"></HeaderPage>
        <div className="title-page" style={{ padding: "0 50px" }}>
          Quản lý cấp số
        </div>
        <div className="profile-content__card d-flex justify-content-evenly mt-5">
          <Card
            className="text-center"
            style={{ width: "1000px", height: 400 }}
          >
            <div className="card-title">Cấp số mới</div>
            <div className="card-body mt-3">
              <p>Dịch vụ khách hàng lựa chọn</p>
              <Select
                style={{ width: 400, textAlign: "start" }}
                defaultValue="Tất cả"
                options={[
                  { value: "Tất cả", label: "Tất cả" },
                  {
                    value: "Khám sản - Phụ khoa",
                    label: "Khám sản - Phụ khoa",
                  },
                  { value: "Khám răng hàm mặt", label: "Khám răng hàm mặt" },
                  { value: "Khám tai mũi họng", label: "Khám tai mũi họng" },
                  { value: "Khám mắt", label: "Khám mắt" },
                  { value: "Khám tim mạch", label: "Khám tim mạch" },
                ]}
                onChange={handleServiceChange}
              />
            </div>
            <div className="card-footer mt-5">
              <Space>
                <Button
                  className="btn-cancel"
                  style={{ color: "#fff", width: 115, height: 48 }}
                  onClick={handleGoBack}
                >
                  <span>Hủy</span>
                </Button>
                <button
                  className="color-btn"
                  style={{
                    color: "#fff",
                    backgroundColor: "#ff9138",
                    width: 115,
                    height: 48,
                    border: "none",
                    borderRadius: 8,
                  }}
                  onClick={showModal}
                >
                  In số
                </button>
              </Space>
            </div>
          </Card>
        </div>

        <div className="popup">
          <Modal
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            {capSo && (
              <>
                <p className="Capso-title h4 text-center">Số thứ tự được cấp</p>
                <p className="numberService text-center">
                  {capSo.numberService}
                </p>
                <p className="nameService text-center">
                  Dịch vụ: {capSo.nameService} (
                  <span className="fw-bold">tại quầy số {randomNumber}</span>)
                </p>
                <div className="footer-modal">
                  <p className="text-white text-center">
                    Thời gian cấp : {capSo.grantTime}
                  </p>
                  <p className="text-white text-center">
                    Hạn sử dụng: {capSo.expiry}
                  </p>
                </div>
              </>
            )}
          </Modal>
        </div>
      </Content>
    </>
  );
};

export default CapSoMoi;

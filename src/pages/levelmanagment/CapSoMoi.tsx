import { Button, Card, Modal, Select, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { SiderBar } from "../../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCapSo } from "../../redux/slices/capsoSlice";

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
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [capSo, setCapSo] = useState<CapSoMoi | null>(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };

  const handleAddCapSo = async () => {
    const capSoData = await dispatch(addCapSo(selectedService));
    setCapSo(capSoData.payload.capSo);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const randomNumber = Math.floor(Math.random() * 10) + 1;

  return (
    <>
      <SiderBar />

      <Content>
        <HeaderPage label="Cấp số mới" />
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
                  onClick={handleAddCapSo}
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

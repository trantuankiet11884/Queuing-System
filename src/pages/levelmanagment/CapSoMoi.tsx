import { Button, Card, Modal, Select, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { SiderBar } from "../../components/Sidebar";
import * as React from "react";
import { useState } from "react";

interface CapSoMoi {
  numberService: { id: string; collection: "services" };
  nameCustomer: string;
  nameDevice: { id: string; collection: "devices" };
  nameService: string;
  grantTime: string;
  expiry: string;
  status: string;
}

const CapSoMoi = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
                  { value: "all", label: "Tất cả" },
                  {
                    value: "Khám sản - Phụ khoa",
                    label: "Khám sản - Phụ khoa",
                  },
                  { value: "Khám răng hàm mặt", label: "Khám răng hàm mặt" },
                  { value: "Khám tai mũi họng", label: "Khám tai mũi họng" },
                  { value: "Khám mắt", label: "Khám mắt" },
                  { value: "Khám tim mạch", label: "Khám tim mạch" },
                ]}
              />
            </div>
            <div className="card-footer mt-5">
              <Space>
                <Button
                  className="btn-cancel"
                  style={{ color: "#fff", width: 115, height: 48 }}
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

        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Content>
    </>
  );
};

export default CapSoMoi;

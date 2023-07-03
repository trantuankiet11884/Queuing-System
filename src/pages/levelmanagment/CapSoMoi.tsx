import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Space,
} from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { SiderBar } from "../../components/Sidebar";

const CapSoMoi = () => {
  return (
    <>
      <SiderBar/>
      
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
                  { value: "", label: "Tất cả" },
                  { value: "", label: "Khám sản - Phụ khoa" },
                  { value: "", label: "Khám răng hàm mặt" },
                  { value: "", label: "Khám tai mũi họng" },
                  { value: "", label: "Khám mắt" },
                  { value: "", label: "Khám tim mạch" },
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
                <Button
                  className="color-btn"
                  type="primary"
                  style={{
                    color: "#fff",
                    backgroundColor: "#ff9138",
                    width: 115,
                    height: 48,
                  }}
                  htmlType="submit"
                >
                  In số
                </Button>
              </Space>
            </div>
          </Card>
        </div>
      </Content>
    </>
  );
};

export default CapSoMoi;

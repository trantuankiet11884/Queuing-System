import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { Button, Card, Col, Form, Row } from "antd";
import { Link } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";

const CapSoChiTiet = () => {
  return (
    <>
      <Content>
        <HeaderPage label="Chi tiết"></HeaderPage>
        <div className="title-page" style={{ padding: "0 50px" }}>
          Quản lý cấp sô
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Card style={{ width: 900, height: 470 }}>
            <p>Thông tin cấp số</p>
            <Row className="d-flex justify-content-between">
              <Col>
                <Form layout="horizontal">
                  <Form.Item label="Họ tên">Nguyễn Thị Dung</Form.Item>
                  <Form.Item label="Tên dịch vụ">Khám tim mạch</Form.Item>
                  <Form.Item label="Số thứ tự">2001201</Form.Item>
                  <Form.Item label="Thời gian cấp">
                    14:35 - 07/11/2021
                  </Form.Item>
                  <Form.Item label="Hạn sử dụng">18:00 - 07/11/2021</Form.Item>
                </Form>
              </Col>
              <Col>
                <Form layout="horizontal">
                  <Form.Item label="Nguồn cấp">Kiosk</Form.Item>
                  <Form.Item label="Trạng thái">Đang chờ</Form.Item>
                  <Form.Item label="Số điện thoại">0948523623</Form.Item>
                  <Form.Item label="Địa chỉ email">
                    nguyendung@gmail.com
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                <Button className=" btn-post d-flex flex-column align-items-center">
                  <RollbackOutlined />

                  <Link to="/" className="btn-text-post">
                    Quay lại
                  </Link>
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      </Content>
    </>
  );
};

export default CapSoChiTiet;

import Layout, { Content } from "antd/es/layout/layout";
import React from "react";
import { SiderBar } from "../../components/Sidebar";
import HeaderPage from "../../components/Header";
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";

const DetailDevice = () => {
  return (
    <>
      <Layout>
        <SiderBar />
        <Content>
          <HeaderPage label="Thiết bị > Danh sách thiết bị > Chi tiết thiết bị"></HeaderPage>

          <div className="d-flex justify-content-center mt-3">
            <Card style={{ width: 900, height: 470 }}>
              <p>Thông tin thiết bị</p>
              <Row className="d-flex justify-content-between">
                <Col>
                  <Form layout="horizontal">
                    <Form.Item label="Mã thiết bị">KIO_01</Form.Item>
                    <Form.Item label="Tên thiết bị">Kiosk</Form.Item>
                    <Form.Item label="Địa chỉ IP">128.172.308</Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form layout="horizontal">
                    <Form.Item label="Loại thiết bị">Kiosk</Form.Item>
                    <Form.Item label="Tên đăng nhập">username</Form.Item>
                    <Form.Item label="Mật khẩu">CMS</Form.Item>
                  </Form>
                </Col>
                <Col></Col>
              </Row>
              <Col>
                <Form layout="vertical">
                  <Form.Item label="Dịch vụ sử dụng">
                    <p>Khám tim mạch, Khám sản - Phụ sản</p>
                  </Form.Item>
                </Form>
              </Col>
            </Card>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default DetailDevice;

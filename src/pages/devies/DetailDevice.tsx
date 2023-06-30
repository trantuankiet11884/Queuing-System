import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import HeaderPage from "../../components/Header";
import { Card, Col, Form, Row } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";

const DetailDevice = () => {
  const { idDevice } = useParams<{ idDevice: string }>();
  const device = useSelector((state: RootState) =>
    state.devices.devices.find((d) => d.idDevice === idDevice)
  );

  if (!device) {
    return <div className="h1">Không tìm thấy thiết bị</div>;
  }

  return (
    <>
      <Content>
        <HeaderPage label="Thiết bị > Danh sách thiết bị > Chi tiết thiết bị"></HeaderPage>
        <div className="title-page" style={{ padding: "0 50px" }}>
          Quản lý thiết bị
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Card style={{ padding: "0 0 0 0", width: 900, height: 430 }}>
            <p className="info-device">Thông tin thiết bị</p>
            <>
              <Row className="d-flex justify-content-between">
                <Col>
                  <Form layout="horizontal">
                    <Form.Item label="Mã thiết bị">
                      {" "}
                      {device.idDevice}
                    </Form.Item>
                    <Form.Item label="Tên thiết bị"> {device.name}</Form.Item>
                    <Form.Item label="Địa chỉ IP"> {device.ip}</Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form layout="horizontal">
                    <Form.Item label="Loại thiết bị"> {device.type}</Form.Item>
                    <Form.Item label="Tên đăng nhập">
                      {" "}
                      {device.username}
                    </Form.Item>
                    <Form.Item label="Mật khẩu"> {device.password}</Form.Item>
                  </Form>
                </Col>
                <Col></Col>
              </Row>
              <Col>
                <Form layout="vertical">
                  <Form.Item label="Dịch vụ sử dụng">
                    {device.service}
                  </Form.Item>
                </Form>
              </Col>
            </>
          </Card>
        </div>
      </Content>
    </>
  );
};

export default DetailDevice;

import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import HeaderPage from "../../components/Header";
import { Card, Col, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const DetailDevice = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.devices.devices);
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
            {data.map((item) => {
              return (
                <>
                  <Row className="d-flex justify-content-between">
                    <Col>
                      <Form layout="horizontal">
                        <Form.Item label="Mã thiết bị">{item.id}</Form.Item>
                        <Form.Item label="Tên thiết bị">{item.name}</Form.Item>
                        <Form.Item label="Địa chỉ IP">{item.ip}</Form.Item>
                      </Form>
                    </Col>
                    <Col>
                      <Form layout="horizontal">
                        <Form.Item label="Loại thiết bị">{item.name}</Form.Item>
                        <Form.Item label="Tên đăng nhập">username</Form.Item>
                        <Form.Item label="Mật khẩu">CMS</Form.Item>
                      </Form>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Col>
                    <Form layout="vertical">
                      <Form.Item label="Dịch vụ sử dụng">
                        {item.service}
                      </Form.Item>
                    </Form>
                  </Col>
                </>
              );
            })}
          </Card>
        </div>
      </Content>
    </>
  );
};

export default DetailDevice;

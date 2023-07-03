import { Content } from "antd/es/layout/layout";
import React from "react";
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import HeaderPage from "../../../components/Header";
import { SiderBar } from "../../../components/Sidebar";

const UpdateAccount = () => {
  return (
    <>
      <SiderBar/>
      
      <Content>
        <HeaderPage label="Thiết bị > Danh sách thiết bị > Thêm thiết bị"></HeaderPage>
        <div className="title-page" style={{ padding: "0 50px" }}>
          Danh sách tài khoản
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center mt-3">
          <Card style={{ width: 900, height: 380 }}>
            <p>Thông tin thiết bị</p>
            <Row className="d-flex">
              <Col style={{ margin: "0 20px" }}>
                <Form layout="vertical">
                  <Form.Item label="Họ tên *" style={{ margin: 0 }}>
                    <Input style={{ width: "400px" }} />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Số điện thoại *">
                    <Input style={{ width: "400px" }} />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Email *">
                    <Input style={{ width: "400px" }} />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Vai trò *">
                    <Select
                      placeholder="Chọn loại thiết bị"
                      style={{ width: 400 }}
                      options={[
                        { value: "", label: "" },
                        { value: "", label: "" },
                        { value: "", label: "" },
                      ]}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                <Form layout="vertical">
                  <Form.Item style={{ margin: 0 }} label="Tên đăng nhập *">
                    <Input style={{ width: "400px" }} />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Mật khẩu *">
                    <Input.Password style={{ width: "400px" }} />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Nhập lại mật khẩu *">
                    <Input.Password style={{ width: "400px" }} />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Tình trạng*">
                    <Select
                      placeholder="Chọn loại thiết bị"
                      style={{ width: 400 }}
                      options={[
                        { value: "", label: "" },
                        { value: "", label: "" },
                        { value: "", label: "" },
                      ]}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
          <Form.Item className="mt-1" style={{ textAlign: "center" }}>
            <Space>
              <Button className="btn-cancel" style={{ color: "#fff" }}>
                <span>Hủy</span>
              </Button>
              <Button
                className="color-btn"
                type="primary"
                style={{
                  color: "#fff",
                  backgroundColor: "#ff9138",
                }}
                htmlType="submit"
              >
                Cập nhật
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Content>
    </>
  );
};

export default UpdateAccount;

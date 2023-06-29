import Layout, { Content } from "antd/es/layout/layout";
import React from "react";
import { SiderBar } from "../../components/Sidebar";
import HeaderPage from "../../components/Header";
import { Button, Card, Col, Form, Input, Row, Select, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import { PlusSquareOutlined } from "@ant-design/icons";

const UpdateDevice = () => {
  return (
    <>
      <Content>
        <HeaderPage label="Thiết bị > Danh sách thiết bị > Thêm thiết bị"></HeaderPage>
        <div className="title-page" style={{ padding: "0 50px" }}>
          Quản lý thiết bị
        </div>
        <div className="d-flex flex-column align-items-center  mt-3">
          <div className="d-flex">
            <div>
              <Card style={{ width: 900, height: 420 }}>
                <p>Thông tin thiết bị</p>
                <Row className="d-flex">
                  <Col style={{ margin: "0 20px" }}>
                    <Form layout="vertical">
                      <Form.Item label="Mã thiết bị *">
                        <Input style={{ width: "400px" }} />
                      </Form.Item>
                      <Form.Item label="Tên thiết bị *">
                        <Input style={{ width: "400px" }} />
                      </Form.Item>
                      <Form.Item label="Địa chỉ IP:*">
                        <Input style={{ width: "400px" }} />
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col>
                    <Form layout="vertical">
                      <Form.Item label="Loại thiết bị *">
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
                      <Form.Item label="Tên đăng nhập *">
                        <Input style={{ width: "400px" }} />
                      </Form.Item>
                      <Form.Item label="Mật khẩu *">
                        <Input style={{ width: "400px" }} />
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col style={{ margin: "0 20px" }}>
                    <Form layout="vertical">
                      <Form.Item
                        label="Dịch vụ sử dụng"
                        style={{ height: "40px" }}
                      >
                        <div className="border-tag d-flex align-items-center">
                          <Tag
                            className="tag-device ms-2 d-flex align-items-center"
                            closable
                          >
                            Kham tim mach
                          </Tag>
                        </div>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </Card>
            </div>
            <div>
              <Button className=" btn-post d-flex flex-column align-items-center">
                <PlusSquareOutlined />
                <Link to="/post-device" className="btn-text-post">
                  Thêm thiết bị
                </Link>
              </Button>
            </div>
          </div>
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

export default UpdateDevice;

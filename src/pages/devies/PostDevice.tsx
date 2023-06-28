import Layout, { Content } from "antd/es/layout/layout";
import React from "react";
import { SiderBar } from "../../components/Sidebar";
import HeaderPage from "../../components/Header";
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";

const PostDevice = () => {
  return (
    <>
      <Layout>
        <SiderBar />
        <Content>
          <HeaderPage label="Thiết bị > Danh sách thiết bị > Thêm thiết bị"></HeaderPage>

          <div className="d-flex justify-content-center mt-3">
            <Card style={{ width: 900, height: 470 }}>
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
                    <Form.Item label="Dịch vụ sử dụng">
                      <Input style={{ width: "823px" }} />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              <Form.Item style={{ textAlign: "center" }}>
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
                    Thêm thiết bị
                  </Button>
                </Space>
              </Form.Item>
            </Card>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default PostDevice;

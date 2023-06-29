import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import HeaderPage from "../../components/Header";
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";

const PostDevice = () => {
  const [inputValues, setInputValues] = useState({
    id: "",
    name: "",
    ip: "",
    type: "",
    username: "",
    password: "",
    service: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Input values:", inputValues);
  };
  return (
    <>
      <Content>
        <HeaderPage label="Thiết bị > Danh sách thiết bị > Thêm thiết bị"></HeaderPage>

        <div className="title-page" style={{ padding: "0 50px" }}>
          Quản lý thiết bị
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center mt-1">
          <Card style={{ width: 900, height: 397 }}>
            <p>Thông tin thiết bị</p>
            <Row className="d-flex">
              <Col style={{ margin: "0 20px" }}>
                <Form layout="vertical">
                  <Form.Item label="Mã thiết bị *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item label="Tên thiết bị *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item label="Địa chỉ IP:*">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                    />
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
                        { value: "", label: "Kiosk" },
                        { value: "", label: "Display counter" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item label="Tên đăng nhập *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item label="Mật khẩu *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col style={{ margin: "0 20px" }}>
                <Form layout="vertical">
                  <Form.Item label="Dịch vụ sử dụng">
                    <Input
                      style={{ width: "823px" }}
                      onChange={handleInputChange}
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
                onSubmit={() => handleSubmit}
              >
                Thêm thiết bị
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Content>
    </>
  );
};

export default PostDevice;

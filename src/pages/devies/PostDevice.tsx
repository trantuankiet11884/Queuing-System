import { Content } from "antd/es/layout/layout";
import React, { MouseEventHandler, useState } from "react";
import HeaderPage from "../../components/Header";
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import { firestore } from "../../firebase/firebase";

const PostDevice = () => {
  const [inputValues, setInputValues] = useState({
    id: "",
    idDevice: "",
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

  const handleSelectChange = (value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      type: value,
    }));
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const devicesRef = firestore.collection("devices");
    const newDevice = { ...inputValues };
    try {
      if (
        !newDevice.idDevice ||
        !newDevice.name ||
        !newDevice.ip ||
        !newDevice.username ||
        !newDevice.password ||
        !newDevice.type ||
        !newDevice.service
      ) {
        alert("Vui lòng nhập đầy đủ thông tin thiết bị.");
        return;
      }
      const docRef = await devicesRef.add(newDevice);
      console.log("Thêm thiết bị thành công!");
      setInputValues({
        id: "",
        idDevice: "",
        name: "",
        ip: "",
        type: "",
        username: "",
        password: "",
        service: "",
      });
    } catch (error) {
      console.error("Lỗi khi thêm thiết bị: ", error);
    }
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
                      value={inputValues.idDevice}
                      name="idDevice"
                    />
                  </Form.Item>
                  <Form.Item label="Tên thiết bị *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.name}
                      name="name"
                    />
                  </Form.Item>
                  <Form.Item label="Địa chỉ IP:*">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.ip}
                      name="ip"
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
                      value={inputValues.type}
                      options={[
                        { value: "kiosk", label: "Kiosk" },
                        { value: "display-counter", label: "Display counter" },
                      ]}
                      onChange={handleSelectChange}
                      data-name="type"
                    />
                  </Form.Item>
                  <Form.Item label="Tên đăng nhập *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.username}
                      name="username"
                    />
                  </Form.Item>
                  <Form.Item label="Mật khẩu *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.password}
                      name="password"
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
                      value={inputValues.service}
                      name="service"
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
              <button
                className="color-btn"
                type="button"
                style={{
                  color: "#fff",
                  backgroundColor: "#ff9138",
                  border: "none",
                  borderRadius: 5,
                }}
                onClick={handleSubmit}
              >
                Thêm thiết bị
              </button>
            </Space>
          </Form.Item>
        </div>
      </Content>
    </>
  );
};

export default PostDevice;

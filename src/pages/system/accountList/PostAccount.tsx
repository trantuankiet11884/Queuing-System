import { Content } from "antd/es/layout/layout";
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import HeaderPage from "../../../components/Header";
import { SiderBar } from "../../../components/Sidebar";
import * as React from "react";
import { useState, useEffect, MouseEventHandler } from "react";
import { firestore } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const PostAccount = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [inputValues, setInputValues] = useState({
    hvten: "",
    username: "",
    password: "",
    confirmPwd: "",
    phone: "",
    email: "",
    role: "",
    isActive: "",
    desc: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const accountRef = firestore.collection("account");
    const newAccount = { ...inputValues, desc: inputValues.role };

    try {
      if (
        !newAccount.hvten ||
        !newAccount.username ||
        !newAccount.password ||
        !newAccount.confirmPwd ||
        !newAccount.email ||
        !newAccount.phone ||
        !newAccount.role ||
        !newAccount.isActive
      ) {
        alert("Vui lòng nhập đầy đủ thông tin");
      } else if (newAccount.password !== newAccount.confirmPwd) {
        alert("Mật khẩu không khớp");
      } else {
        const docRef = await accountRef.add(newAccount);
        setInputValues({
          hvten: "",
          username: "",
          password: "",
          confirmPwd: "",
          phone: "",
          email: "",
          role: "",
          isActive: "",
          desc: "",
        });
        // handleGoBack();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SiderBar />

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
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.hvten}
                      name="hvten"
                      placeholder="Nhập họ tên"
                    />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Số điện thoại *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.phone}
                      name="phone"
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Email *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.email}
                      name="email"
                      placeholder="Nhập email"
                    />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Vai trò *">
                    <Select
                      placeholder="Chọn vai trò"
                      style={{ width: 400 }}
                      value={inputValues.role}
                      onChange={(value) => handleSelectChange("role", value)}
                      data-name="role"
                      options={[
                        { value: "Kế toán", label: "Kế toán" },
                        { value: "Bác sĩ", label: "Bác sĩ" },
                        { value: "Lễ tân", label: "Lễ tân" },
                        { value: "Quản lý", label: "Quản lý" },
                        { value: "Admin", label: "Admin" },
                        { value: "Superadmin", label: "Superadmin" },
                      ]}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                <Form layout="vertical">
                  <Form.Item style={{ margin: 0 }} label="Tên đăng nhập *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.username}
                      name="username"
                      placeholder="Nhập tên đăng nhập"
                    />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Mật khẩu *">
                    <Input.Password
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.password}
                      name="password"
                    />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Nhập lại mật khẩu *">
                    <Input.Password
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.confirmPwd}
                      name="confirmPwd"
                    />
                  </Form.Item>
                  <Form.Item style={{ margin: 0 }} label="Tình trạng*">
                    <Select
                      placeholder="Chọn loại thiết bị"
                      style={{ width: 400 }}
                      options={[
                        { value: "true", label: "Hoạt động" },
                        { value: "false", label: "Ngưng hoạt động" },
                      ]}
                      onChange={(value) =>
                        handleSelectChange("isActive", value)
                      }
                      value={inputValues.isActive}
                      data-name="isActive"
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
          <Form.Item className="mt-1" style={{ textAlign: "center" }}>
            <Space>
              <Button
                className="btn-cancel"
                onClick={handleGoBack}
                style={{ color: "#fff" }}
              >
                <span>Hủy</span>
              </Button>
              <button
                className="color-btn"
                onClick={handleSubmit}
                style={{
                  color: "#fff",
                  backgroundColor: "#ff9138",
                  border: "none",
                  outline: "none",
                  borderRadius: 8,
                }}
              >
                Thêm
              </button>
            </Space>
          </Form.Item>
        </div>
      </Content>
    </>
  );
};

export default PostAccount;

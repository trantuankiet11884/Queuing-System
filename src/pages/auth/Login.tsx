import { Row, Col, Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoAlta, imageRightLogin } from "../../constant/Image";
import { auth } from "../../firebase/firebase";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const LoginPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      user ? navigate("/dashboard") : navigate("/login");
    } catch (error) {
      setMessage(false);
      console.log(error);
    }
  };

  return (
    <Row align={"middle"} style={{ minHeight: "100vh" }}>
      <Col span={10} className="centered-col bg-white">
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item className="d-flex justify-content-center">
            <div dangerouslySetInnerHTML={{ __html: logoAlta }}></div>
          </Form.Item>

          <Form.Item
            label="Tên đăng nhập *"
            className="form-label"
            name="username"
          >
            <Input
              style={{ width: "400px", height: "44px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Mật khẩu *" className="form-label" name="password">
            <Input.Password
              style={{ width: "400px", height: "44px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            {message ? (
              <Link to="/confirm-forgotpwd" className="forgot-pwd">
                Quên mật khẩu?
              </Link>
            ) : (
              <p className="forgot-pwd d-flex align-items-center">
                <ExclamationCircleOutlined /> &nbsp; Sai tên đăng nhập hoặc mật
                khẩu
              </p>
            )}
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              className="color-btn"
              type="primary"
              style={{
                color: "#fff",
                backgroundColor: "#ff9138",
              }}
              htmlType="submit"
            >
              Đăng nhập
            </Button>
            <Form.Item>
              {!message && (
                <Button
                  className="forgot-pwd"
                  type="link"
                  onClick={() => navigate("/confirm-forgotpwd")}
                >
                  Quên mật khẩu
                </Button>
              )}
            </Form.Item>
          </Form.Item>
        </Form>
      </Col>
      <Col span={14} className="d-flex justify-content-center align-items-end">
        <div className="image-right">
          <div dangerouslySetInnerHTML={{ __html: imageRightLogin }}></div>
          <div className="text-right">
            <p className="text-right__first">Hệ thống</p>
            <p className="text-right__seconds">Quản lý xếp hàng</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;

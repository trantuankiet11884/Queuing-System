import { Row, Col, Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoAlta, imageRightLogin, imageDot } from "../../constant/Image";
import { auth } from "../../firebase/firebase";
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
      setMessage(!message);
      console.log(error);
    }
  };

  return (
    <Row align={"middle"} style={{ minHeight: "100vh" }}>
      <Col span={10} className="centered-col">
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
            <Link to={"/"} className="forgot-pwd">
              {message ? "Quên mật khẩu?" : `Sai mật khẩu hoặc tên đăng nhập`}
            </Link>
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

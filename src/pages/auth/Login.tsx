import { Row, Col, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoAlta, imageRightLogin } from "../../constant/Image";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchAccount, login } from "../../redux/slices/accountSlice";
const LoginPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch: any = useDispatch();
  const data = useSelector((state: RootState) => state.account.account);

  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const found = data.find((acc) => acc.email === email);
      if (!found) return setMessages(false);
      if (found && found.password === password) {
        dispatch(login(found));
        navigate("/dashboard");
        message.success("Đăng nhập thành công !!!");
      } else {
        setMessages(false);
      }
      dispatch(
        login({
          email,
          password,
          id: "",
          username: "",
          hvten: "",
          phone: "",
          role: "",
          isActive: false,
          confirmPwd: "",
          desc: "",
        })
      );
    } catch (error) {
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
            {messages ? (
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
              {!messages && (
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

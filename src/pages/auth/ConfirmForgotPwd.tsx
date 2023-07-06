import { Row, Col, Form, Input, Button, Space } from "antd";
import { logoAlta } from "../../constant/Image";
import { imageForgotPwd } from "../../constant/Image";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ConfirmForgotPwd = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async () => {
    const email = form.getFieldValue("email");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email reset mật khẩu đã được gửi");
      // navigate("/reset-pwd");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row align={"middle"} style={{ minHeight: "100vh" }}>
      <Col span={10} className="centered-col">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item className="d-flex justify-content-center">
            <div dangerouslySetInnerHTML={{ __html: logoAlta }}></div>
          </Form.Item>
          <Form.Item className="d-flex justify-content-center">
            <p className="text-forgot">Đặt lại mật khẩu</p>
          </Form.Item>
          <Form.Item
            label="Vui lòng nhập email để đặt lại mật khẩu của bạn *"
            className="form-label"
            name="email"
          >
            <Input style={{ width: "400px", height: "44px" }} />
          </Form.Item>

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
                Tiếp tục
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
      <Col span={14}>
        <div dangerouslySetInnerHTML={{ __html: imageForgotPwd }}></div>
      </Col>
    </Row>
  );
};

export default ConfirmForgotPwd;

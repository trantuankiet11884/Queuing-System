import { Row, Col, Form, Input, Button } from "antd";
import { logoAlta } from "../../constant/Image";
import { imageForgotPwd } from "../../constant/Image";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
const ResetPwd = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  return (
    <Row align={"middle"} style={{ minHeight: "100vh" }}>
      <Col span={10} className="centered-col bg-white">
        <Form layout="vertical">
          <Form.Item className="d-flex justify-content-center">
            <div dangerouslySetInnerHTML={{ __html: logoAlta }}></div>
          </Form.Item>

          {success ? (
            <Form.Item className="d-flex justify-content-center">
              <p className="text-forgot">Đặt lại mật khẩu thành công!</p>
            </Form.Item>
          ) : (
            <>
              <Form.Item className="d-flex justify-content-center">
                <p className="text-forgot">Đặt lại mật khẩu mới</p>
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                className="form-label"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu" },
                  { min: 6, message: "Mật khẩu phải có ít nhất 6 kí tự" },
                ]}
              >
                <Input.Password style={{ width: "400px", height: "44px" }} />
              </Form.Item>

              <Form.Item
                label="Nhập lại mật khẩu"
                className="form-label"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không khớp")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password style={{ width: "400px", height: "44px" }} />
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
                  Xác nhận
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Col>
      <Col span={14}>
        <div dangerouslySetInnerHTML={{ __html: imageForgotPwd }}></div>
      </Col>
    </Row>
  );
};

export default ResetPwd;

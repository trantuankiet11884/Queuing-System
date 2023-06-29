import { Row, Col, Form, Input, Button } from "antd";
import { logoAlta } from "../../constant/Image";
import { imageForgotPwd } from "../../constant/Image";
const ResetPwd = () => {
  return (
    <Row align={"middle"} style={{ minHeight: "100vh" }}>
      <Col span={10} className="centered-col">
        <Form layout="vertical">
          <Form.Item className="d-flex justify-content-center">
            <div dangerouslySetInnerHTML={{ __html: logoAlta }}></div>
          </Form.Item>

          <Form.Item className="d-flex justify-content-center">
            <p className="text-forgot">Đặt lại mật khẩu mới</p>
          </Form.Item>

          <Form.Item label="Mật khẩu" className="form-label" name="password">
            <Input.Password style={{ width: "400px", height: "44px" }} />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu"
            className="form-label"
            name="password"
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
        </Form>
      </Col>
      <Col span={14}>
        <div dangerouslySetInnerHTML={{ __html: imageForgotPwd }}></div>
      </Col>
    </Row>
  );
};

export default ResetPwd;

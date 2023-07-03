import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../../components/Header";
import { Button, Card, Checkbox, Col, Form, Input, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SiderBar } from "../../../components/Sidebar";

const UpdateRole = () => {
  return (
    <>
      <SiderBar/>
      
      <Content>
        <HeaderPage label="Vai trò"></HeaderPage>
        <div className="title-page" style={{ padding: "0 50px" }}>
          Danh sách vai trò
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center mt-3">
          <Card style={{ width: 900, height: 410 }}>
            <p>Thông tin vai trò</p>
            <Row className="d-flex">
              <Col style={{ margin: "0 20px" }}>
                <Form layout="vertical">
                  <Form.Item label="Tên vai trò *">
                    <Input style={{ width: "400px" }} />
                  </Form.Item>
                  <Form.Item label="Mô tả ">
                    <TextArea rows={5} style={{ width: "400px" }} />
                  </Form.Item>
                </Form>
              </Col>
              <Col
                className="p-2"
                style={{
                  width: 400,
                  overflowY: "auto",
                  maxHeight: "320px",
                  background: "var(--orange-orange-50, #FFF2E7)",
                }}
              >
                <Form layout="vertical">
                  <Form.Item label="Phân quyền chức năng">
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      label="Nhóm chức năng A"
                    >
                      <Checkbox>Tất cả</Checkbox>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Checkbox>Chức năng x</Checkbox>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Checkbox>Chức năng y</Checkbox>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Checkbox>Chức năng z</Checkbox>
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label="Phân quyền chức năng">
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      label="Nhóm chức năng B  "
                    >
                      <Checkbox>Tất cả</Checkbox>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Checkbox>Chức năng x</Checkbox>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Checkbox>Chức năng y</Checkbox>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Checkbox>Chức năng z</Checkbox>
                    </Form.Item>
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
              >
                Cập nhật
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Content>
    </>
  );
};

export default UpdateRole;

import Layout, { Content } from "antd/es/layout/layout";
import React from "react";
import { SiderBar } from "../../components/Sidebar";
import HeaderPage from "../../components/Header";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
import TextArea from "antd/es/input/TextArea";

const PostService = () => {
  return (
    <>
      <Layout>
        <SiderBar />
        <Content>
          <HeaderPage label="Thiết bị > Danh sách thiết bị > Thêm thiết bị"></HeaderPage>

          <div className="d-flex flex-column align-items-center justify-content-center mt-3">
            <Card style={{ width: 900, height: 410 }}>
              <p>Thông tin thiết bị</p>
              <Row className="d-flex">
                <Col style={{ margin: "0 20px" }}>
                  <Form layout="vertical">
                    <Form.Item label="Mã thiết bị *">
                      <Input style={{ width: "400px" }} />
                    </Form.Item>
                    <Form.Item label="Tên thiết bị *">
                      <Input style={{ width: "400px" }} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col>
                  <Form layout="vertical">
                    <Form.Item label="Mô tả">
                      <TextArea rows={5} style={{ width: "400px" }} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col style={{ margin: "0 20px" }}>
                  <Form layout="vertical">
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      label="Quy tắc cấp số"
                    >
                      <Checkbox>
                        Tăng tự động từ: <Tag>0001</Tag> đến <Tag>9999</Tag>
                      </Checkbox>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Checkbox>
                        Prefix: <Tag>0001</Tag>
                      </Checkbox>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Checkbox>
                        Surfix: <Tag>0001</Tag>
                      </Checkbox>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Checkbox>Reset mỗi ngày</Checkbox>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Card>
            <Form.Item className="mt-2" style={{ textAlign: "center" }}>
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
                  Thêm dịch vụ
                </Button>
              </Space>
            </Form.Item>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default PostService;

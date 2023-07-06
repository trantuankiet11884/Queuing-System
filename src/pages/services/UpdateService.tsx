import HeaderPage from "../../components/Header";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  Tag,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Content } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import * as React from "react";
import { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase";
import { SiderBar } from "../../components/Sidebar";

const UpdateService = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { id } = useParams<{ id: string }>();
  const service = useSelector((state: RootState) =>
    state.service.services.find((d) => d.id === id)
  );

  const [inputValues, setInputValues] = useState({
    idService: service?.idService,
    name: service?.name,
    desc: service?.desc,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const hanldeUpdateService = async () => {
    try {
      const serviceRef = firestore.collection("services").doc(id);
      await serviceRef.update(inputValues);
    } catch (error) {
      console.log(error);
    }
  };

  if (!service) return <div>Not found services</div>;
  return (
    <>
      <SiderBar />

      <Content>
        <HeaderPage label="Thiết bị > Danh sách thiết bị > Thêm thiết bị"></HeaderPage>
        <div className="title-page" style={{ padding: "0 50px" }}>
          Quản lý dịch vụ
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center mt-1">
          <Card style={{ width: 900, height: 410 }}>
            <p>Thông tin thiết bị</p>
            <Row className="d-flex">
              <Col style={{ margin: "0 20px" }}>
                <Form layout="vertical">
                  <Form.Item label="Mã thiết bị *">
                    <Input
                      style={{ width: "400px" }}
                      value={inputValues.idService}
                      onChange={handleInputChange}
                      name="idService"
                    />
                  </Form.Item>
                  <Form.Item label="Tên thiết bị *" style={{ marginBottom: 0 }}>
                    <Input
                      style={{ width: "400px" }}
                      value={inputValues.name}
                      onChange={handleInputChange}
                      name="name"
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                <Form layout="vertical">
                  <Form.Item label="Mô tả">
                    <TextArea
                      rows={5}
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.desc}
                      name="desc"
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col className="" style={{ margin: "0 20px" }}>
                <Form layout="vertical">
                  <Form.Item style={{ marginBottom: 0 }} label="Quy tắc cấp số">
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
                  {/* <Form.Item>* Là trường thông tin bắt buộc</Form.Item> */}
                </Form>
              </Col>
            </Row>
          </Card>
          <Form.Item className="mt-2" style={{ textAlign: "center" }}>
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
                type="button"
                style={{
                  color: "#fff",
                  backgroundColor: "#ff9138",
                  border: "none",
                  borderRadius: 5,
                }}
                onClick={hanldeUpdateService}
              >
                Cập nhật
              </button>
            </Space>
          </Form.Item>
        </div>
      </Content>
    </>
  );
};

export default UpdateService;

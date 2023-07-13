import { Content } from "antd/es/layout/layout";
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
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { MouseEventHandler, useState } from "react";
import { firestore } from "../../firebase/firebase";
import React, { useEffect } from "react";
import { SiderBar } from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const PostService = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [inputValues, setInputValues] = useState({
    idService: "",
    name: "",
    desc: "",
    numberService: Date.now(),
    isActive: true,
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

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const servicesRef = firestore.collection("services");
    const newService = { ...inputValues };

    try {
      if (!newService.idService || !newService.name || !newService.desc) {
        return message.warning("Bạn hãy nhập đầy đủ các trường dữ liệu !!!");
      }

      const snapshot = await servicesRef
        .where("name", "==", newService.name)
        .get();
      let numberService = 1;

      if (!snapshot.empty) {
        const services = snapshot.docs.map((doc) => doc.data());
        numberService =
          services.reduce((max, service) => {
            return Math.max(max, service.numberService);
          }, 0) + 1;

        setInputValues((prevValues) => ({
          ...prevValues,
          numberService,
        }));
      }

      const docRef = await servicesRef.add({
        ...newService,
        numberService,
      });
      message.success("Thêm dịch vụ thành công!");
      setInputValues({
        idService: "",
        name: "",
        desc: "",
        numberService: 0,
        isActive: true,
      });
      handleGoBack();
    } catch (error) {
      message.error(`Lỗi khi thêm dịch vụ: ${error} `);
    }
  };

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
                  <Form.Item label="Mã dịch vụ *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.idService}
                      name="idService"
                    />
                  </Form.Item>
                  <Form.Item label="Tên dịch vụ *">
                    <Input
                      style={{ width: "400px" }}
                      onChange={handleInputChange}
                      value={inputValues.name}
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
              <Col style={{ margin: "0 20px" }}>
                <Form layout="vertical">
                  <Form.Item style={{ marginBottom: 0 }} label="Quy tắc cấp số">
                    <Checkbox>
                      Tăng tự động từ: <Tag>0001</Tag> đến <Tag>9999</Tag>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Checkbox>
                      Prefix:<Tag>0001</Tag>
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
                onClick={handleSubmit}
              >
                Thêm thiết bị
              </button>
            </Space>
          </Form.Item>
        </div>
      </Content>
    </>
  );
};

export default PostService;

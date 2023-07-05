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
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { MouseEventHandler, useState } from "react";
import { firestore } from "../../firebase/firebase";
import React, { useEffect } from "react";
import { SiderBar } from "../../components/Sidebar";

const PostService = () => {
  const [inputValues, setInputValues] = useState({
    idService: "",
    name: "",
    desc: "",
    numberService: "01",
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

  const handleGenerateNumberService = () => {
    const randomNumber = Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, "0");
    setInputValues((prevValues) => ({
      ...prevValues,
      numberService: randomNumber,
    }));
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const servicesRef = firestore.collection("services");
    const newService = { ...inputValues };

    try {
      if (!newService.idService || !newService.name || !newService.desc) {
        return;
      }

      const docRef = await servicesRef.add({
        ...newService,
      });
      console.log("Thêm dịch vụ thành công!");
      setInputValues({
        idService: "",
        name: "",
        desc: "",
        numberService: "01",
        isActive: true,
      });
    } catch (error) {
      console.error("Lỗi khi thêm dịch vụ: ", error);
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
                    <Checkbox onClick={handleGenerateNumberService}>
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
              <Button className="btn-cancel" style={{ color: "#fff" }}>
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

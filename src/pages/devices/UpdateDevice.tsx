import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import HeaderPage from "../../components/Header";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Modal,
  message,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { firestore } from "../../firebase/firebase";
import { SiderBar } from "../../components/Sidebar";
import { deviceState, updateDevice } from "../../redux/slices/deviceSlice";

const UpdateDevice = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { id } = useParams<{ id: string }>();
  const device = useSelector((state: RootState) =>
    state.devices.devices.find((d) => d.id === id)
  );
  const [inputValues, setInputValues] = useState<deviceState>({
    id: device?.id,
    idDevice: device?.idDevice || "",
    name: device?.name || "",
    ip: device?.ip || "",
    isActive: device?.isActive || false,
    isConnect: device?.isConnect || false,
    service: device?.service || "",
    username: device?.username || "",
    type: device?.type || "",
    password: device?.password || "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      type: value,
    }));
  };

  const handleUpdateDevice = async () => {
    try {
      const updatedDevice = { ...inputValues };
      await dispatch(updateDevice(updatedDevice));
      const deviceRef = firestore.collection("devices").doc(id);
      await deviceRef.update(updatedDevice);
      message.success("Cập nhật thành công !!!");
      handleGoBack();
    } catch (error) {
      message.error(`${error}`);
    }
  };

  if (!device) {
    return <div className="h1">Không tìm thấy thiết bị</div>;
  }

  return (
    <>
      <SiderBar />

      <Content>
        <HeaderPage label="Thiết bị > Danh sách thiết bị > Thêm thiết bị"></HeaderPage>
        <div className="title-page" style={{ padding: "0 50px" }}>
          Quản lý thiết bị
        </div>
        <div className="d-flex flex-column align-items-center  mt-3">
          <div className="d-flex">
            <div>
              <Card style={{ width: 900, height: 420 }}>
                <p>Thông tin thiết bị</p>

                <Row className="d-flex">
                  <Col style={{ margin: "0 20px" }}>
                    <Form layout="vertical">
                      <Form.Item label="Mã thiết bị *">
                        <Input
                          style={{ width: "400px" }}
                          name="idDevice"
                          onChange={handleInputChange}
                          value={inputValues.idDevice}
                        />
                      </Form.Item>
                      <Form.Item label="Tên thiết bị *">
                        <Input
                          style={{ width: "400px" }}
                          name="name"
                          onChange={handleInputChange}
                          value={inputValues.name}
                        />
                      </Form.Item>
                      <Form.Item label="Địa chỉ IP:*">
                        <Input
                          style={{ width: "400px" }}
                          name="ip"
                          onChange={handleInputChange}
                          value={inputValues.ip}
                        />
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col>
                    <Form layout="vertical">
                      <Form.Item label="Loại thiết bị *">
                        <Select
                          placeholder="Chọn loại thiết bị"
                          style={{ width: 400 }}
                          onChange={handleSelectChange}
                          value={inputValues.type}
                          options={[
                            { value: "kiosk", label: "Kiosk" },
                            {
                              value: "display-counter",
                              label: "Display counter",
                            },
                          ]}
                          data-name="type"
                        />
                      </Form.Item>
                      <Form.Item label="Tên đăng nhập *">
                        <Input
                          style={{ width: "400px" }}
                          name="username"
                          onChange={handleInputChange}
                          value={inputValues.username}
                        />
                      </Form.Item>
                      <Form.Item label="Mật khẩu *">
                        <Input
                          style={{ width: "400px" }}
                          name="password"
                          onChange={handleInputChange}
                          value={inputValues.password}
                        />
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col style={{ margin: "0 20px" }}>
                    <Form layout="vertical">
                      <Form.Item
                        label="Dịch vụ sử dụng"
                        style={{ height: "40px" }}
                      >
                        <div className="border-tag d-flex align-items-center">
                          <Tag
                            className="tag-device ms-2 d-flex align-items-center"
                            closable
                          >
                            {device.service}
                          </Tag>
                        </div>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </Card>
            </div>
            <div>
              <Button className=" btn-post d-flex flex-column align-items-center">
                <PlusSquareOutlined />
                <Link to="/post-device" className="btn-text-post">
                  Thêm thiết bị
                </Link>
              </Button>
            </div>
          </div>
          <Form.Item className="mt-1" style={{ textAlign: "center" }}>
            <Space>
              <Button
                className="btn-cancel"
                onClick={handleGoBack}
                style={{ color: "#fff" }}
              >
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
                onClick={handleUpdateDevice}
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

export default UpdateDevice;

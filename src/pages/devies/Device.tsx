import Layout, { Content, Header } from "antd/es/layout/layout";
import { SiderBar } from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Space, Table } from "antd";
import HeaderPage from "../../components/Header";
const { Column } = Table;

type Device = {
  id: string;
  name: string;
  ipAddress: string;
  isOperating: boolean;
  isConnected: boolean;
  service: string;
};

const data: Device[] = [
  {
    id: "1",
    name: "Device 1",
    ipAddress: "192.168.1.1",
    isOperating: true,
    isConnected: true,
    service: "1",
  },
  {
    id: "2",
    name: "Device 2",
    ipAddress: "192.168.1.2",
    isOperating: true,
    isConnected: false,
    service: "2",
  },
  {
    id: "3",
    name: "Device 3",
    ipAddress: "192.168.1.3",
    isOperating: false,
    isConnected: true,
    service: "3",
  },
  {
    id: "4",
    name: "Device 4",
    ipAddress: "192.168.1.3",
    isOperating: false,
    isConnected: true,
    service: "4",
  },
  {
    id: "5",
    name: "Device 5",
    ipAddress: "192.168.1.5",
    isOperating: false,
    isConnected: true,
    service: "5",
  },
];

const Device = () => {
  return (
    <>
      <Layout>
        <SiderBar />
        <Content className="">
          <HeaderPage label="Thiết bị" />
          <Space
            wrap
            style={{
              display: "flex",
              justifyContent: "start",
              padding: "0 50px",
            }}
            className="mt-3"
          >
            <div className="">
              <Form>Trạng thái hoạt động</Form>
              <Select
                placeholder="Tất cả"
                style={{ width: 250, height: 40 }}
                options={[
                  { value: "", label: "Hoạt động" },
                  { value: "", label: "Ngưng hoạt động" },
                ]}
              />
            </div>
            <div>
              <Form>Trạng thái kết nối</Form>
              <Select
                placeholder="Tất cả"
                style={{ width: 250, height: 40 }}
                options={[
                  { value: "", label: "Kết nối" },
                  { value: "", label: "Mất kết nối" },
                ]}
              />
            </div>
            <div style={{ marginLeft: "42%" }}>
              <Form>Từ khóa</Form>
              <Input.Search
                placeholder="Nhập từ khóa"
                style={{ width: 250, height: 40 }}
              ></Input.Search>
            </div>
          </Space>

          <Table
            dataSource={data}
            style={{
              display: "flex",
              justifyContent: "start",
              padding: "0 50px",
            }}
          >
            <Column title="Mã thiết bị" dataIndex="id" key="id" />
            <Column title="Tên thiết bị" dataIndex="name" key="name" />
            <Column title="Địa chỉ IP" dataIndex="ipAddress" key="ipAddress" />
            <Column
              title="Trạng thái hoạt động"
              dataIndex="isOperating"
              key="isOperating"
              render={(isOperating: boolean) =>
                isOperating ? "Đang hoạt động" : "Ngưng hoạt động"
              }
            />
            <Column
              title="Trạng thái kết nối"
              dataIndex="isConnected"
              key="isConnected"
              render={(isConnected: boolean) =>
                isConnected ? "Kết nối" : "Mất kết nối"
              }
            />
            <Column title="Dịch vụ sử dụng" dataIndex="service" key="service" />
            <Column
              title="Hành động"
              key="action"
              render={(text: string, record: Device) => (
                <Space size="middle">
                  <Link to="/details-device" className="dropdown-item">
                    Chi tiết
                  </Link>
                  <Link to="/post-device" className="dropdown-item">
                    cập nhật
                  </Link>
                </Space>
              )}
            />
          </Table>

          <div className="btn-post">
            <Button>Thêm thiết bị</Button>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default Device;

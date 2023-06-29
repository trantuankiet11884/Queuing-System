import Layout, { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { SiderBar } from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Space, Table } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { ColumnProps } from "antd/lib/table";
import { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase";

type Device = {
  id: string;
  name: string;
  ip: string;
  isActive: boolean;
  isConnect: boolean;
  service: string;
};

const columns: ColumnProps<Device>[] = [
  {
    title: "Mã thiết bị",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên thiết bị",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Địa chỉ IP",
    dataIndex: "ip",
    key: "ip",
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) =>
      isActive ? "Đang hoạt động" : "Ngưng hoạt động",
  },
  {
    title: "Trạng thái kết nối",
    dataIndex: "isConnect",
    key: "isConnect",
    render: (isConnect: boolean) => (isConnect ? "Kết nối" : "Mất kết nối"),
  },
  {
    title: "Dịch vụ sử dụng",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Hành động",
    key: "action",
    render: (text: any, record: Device) => (
      <Space size="middle">
        <Link to="/details-device">Chi tiết</Link>
        <Link to="/update-device">Cập nhật</Link>
      </Space>
    ),
  },
];

const Device = () => {
  const [data, setData] = useState<Device[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore.collection("devices").get();
        const data = querySnapshot.docs.map(
          (doc: { id: any; data: () => any }) => ({
            id: doc.id,
            ...doc.data(),
          })
        ) as Device[];
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
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
          <div className="d-flex h-100">
            <div style={{ flex: 1 }}>
              <Table
                className="h-100"
                dataSource={data}
                columns={columns}
                rowKey={(record: Device) => record.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  padding: "0 140px 0 50px",
                }}
              />
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
        </Content>
      </Layout>
    </>
  );
};

export default Device;

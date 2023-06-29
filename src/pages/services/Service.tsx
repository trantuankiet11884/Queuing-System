import Layout, { Content, Header } from "antd/es/layout/layout";
import { SiderBar } from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Space, Table, DatePicker } from "antd";
import HeaderPage from "../../components/Header";
import { PlusSquareOutlined } from "@ant-design/icons";

import { ColumnProps } from "antd/lib/table";

const { RangePicker } = DatePicker;
type Service = {
  id: string;
  name: string;
  desc: string;
  isActive: boolean;
};

const columns: ColumnProps<Service>[] = [
  {
    title: "Mã dịch vụ",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mô tả",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "isOperating",
    key: "isActive",
    render: (isActive: boolean) =>
      isActive ? "Đang hoạt động" : "Ngưng hoạt động",
  },
  {
    title: "Hành động",
    key: "action",
    render: (text: any, record: Service) => (
      <Space size="middle">
        <Link to="/details-device">Chi tiết</Link>
        <Link to="/update-device">Cập nhật</Link>
      </Space>
    ),
  },
];

const Service = () => {
  return (
    <>
      <Layout>
        <SiderBar />
        <Content>
          <HeaderPage label="Dịch vụ" />
          <Space
            wrap
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              padding: "0 0 0 50px",
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
              <Form>Chọn thời gian</Form>
              <RangePicker className="mb-2" />
            </div>
            <div style={{ marginLeft: "42%" }}>
              <Form>Từ khóa</Form>
              <Input.Search
                placeholder="Nhập từ khóa"
                style={{ width: 250, height: 40 }}
              ></Input.Search>
            </div>
          </Space>
          <div className="d-flex">
            <div style={{ flex: 1 }}>
              <Table
                className="h-100"
                // dataSource={data}
                columns={columns}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  padding: "0 100px 0 50px",
                }}
              />
            </div>
            <Button className=" btn-post d-flex flex-column align-items-center">
              <PlusSquareOutlined />
              <Link to="/post-service" className="btn-text-post">
                Thêm dịch vụ
              </Link>
            </Button>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default Service;

import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Space, Table, DatePicker } from "antd";
import HeaderPage from "../../../components/Header";
import { PlusSquareOutlined } from "@ant-design/icons";

import { ColumnProps } from "antd/lib/table";
import { SiderBar } from "../../../components/Sidebar";

type Role = {
  nameRole: string;
  numberCus: number;
  desc: string;
  grantTime: string;
  expiry: string;
  inventory: string;
  status: string;
};

const columns: ColumnProps<Role>[] = [
  {
    title: "Tên vai trò",
    dataIndex: "nameRole",
    key: "nameRole",
  },

  {
    title: "Số người dùng",
    dataIndex: "numberCus",
    key: "numberCus",
  },
  {
    title: "Mô tả",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "Hành động",
    key: "action",
    render: (text: any, record: Role) => (
      <Space size="middle">
        <Link to="/update-role">cập nhật</Link>
      </Space>
    ),
  },
];

const RolePage = () => {
  return (
    <>
      <SiderBar/>
      
      <Content>
        <HeaderPage label="Dịch vụ" />
        <div className="title-page" style={{ padding: "0 50px" }}>
          Danh sách vai trò
        </div>
        <div className=" ms-5 me-5 pe-5 d-flex justify-content-end">
          <div>
            <Form>Từ khóa</Form>
            <Input.Search placeholder="Nhập từ khóa"></Input.Search>
          </div>
        </div>
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
                padding: "0 95px 0 50px",
              }}
            />
          </div>
          <Button className=" btn-post d-flex flex-column align-items-center">
            <PlusSquareOutlined />
            <Link to="/post-role" className="btn-text-post">
              Thêm vai trò
            </Link>
          </Button>
        </div>
      </Content>
    </>
  );
};

export default RolePage;

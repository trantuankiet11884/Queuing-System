import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Space, Table, DatePicker } from "antd";
import HeaderPage from "../../components/Header";
import { PlusSquareOutlined } from "@ant-design/icons";

import { ColumnProps } from "antd/lib/table";
import { SiderBar } from "../../components/Sidebar";

const { RangePicker } = DatePicker;
type Reportt = {
  id: string;
  nameService: string;
  grantTime: Date;
  inventory: string;
  status: string;
};

const columns: ColumnProps<Reportt>[] = [
  {
    title: "Số thứ tự",
    dataIndex: "id",
    key: "id",
  },

  {
    title: "Tên dịch vụ",
    dataIndex: "nameService",
    key: "nameService",
  },
  {
    title: "Thời gian cấp",
    dataIndex: "grantTime",
    key: "grantTime",
  },

  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Nguồn cấp",
    dataIndex: "inventory",
    key: "inventory",
  },
  {
    title: "Hành động",
    key: "action",
    render: (text: any, record: Reportt) => (
      <Space size="middle">
        <Link to="/">Chi tiết</Link>
      </Space>
    ),
  },
];

const Reportt = () => {
  return (
    <>
      <SiderBar/>
      
      <Content>
        <HeaderPage label="Dịch vụ" />

        <div className=" ms-5 me-5 pe-5 d-flex justify-content-between">
          <div>
            <Form>Chọn thời gian</Form>
            <RangePicker></RangePicker>
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
          <Button
            style={{ height: 50 }}
            className=" btn-post d-flex flex-column align-items-center"
          >
            <PlusSquareOutlined />
            <Link to="/" className="btn-text-post">
              Tải về
            </Link>
          </Button>
        </div>
      </Content>
    </>
  );
};

export default Reportt;

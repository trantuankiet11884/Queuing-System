import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Space, Table, DatePicker } from "antd";
import HeaderPage from "../../components/Header";
import { PlusSquareOutlined } from "@ant-design/icons";

import { ColumnProps } from "antd/lib/table";

const { RangePicker } = DatePicker;
type CapSo = {
  id: string;
  nameCustomer: string;
  nameService: string;
  grantTime: Date;
  expiry: Date;
  inventory: string;
  status: string;
};

const columns: ColumnProps<CapSo>[] = [
  {
    title: "Số thứ tự",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "nameCustomer",
    key: "nameCustomer",
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
    title: "Hạn sử dụng",
    dataIndex: "expiry",
    key: "expiry",
  },
  {
    title: "Nguồn cấp",
    dataIndex: "inventory",
    key: "inventory",
  },
  {
    title: "Trạng thái ",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Hành động",
    key: "action",
    render: (text: any, record: CapSo) => (
      <Space size="middle">
        <Link to="/details-device">Chi tiết</Link>
      </Space>
    ),
  },
];

const CapSo = () => {
  return (
    <>
      <Content>
        <HeaderPage label="Dịch vụ" />
        <div className="title-page" style={{ padding: "0 50px" }}>
          Quản lý cấp số
        </div>
        <div className=" ms-5 me-5 pe-5 d-flex justify-content-between">
          <div>
            <Form>Tên dịch vụ</Form>
            <Select
              defaultValue="Tất cả"
              options={[
                { value: "", label: "Tất cả" },
                { value: "", label: "Khám sản - Phụ khoa" },
                { value: "", label: "Khám răng hàm mặt" },
                { value: "", label: "Khám tai mũi họng" },
                { value: "", label: "Khám mắt" },
                { value: "", label: "Khám tim mạch" },
              ]}
            />
          </div>
          <div>
            <Form>Tình trạng</Form>
            <Select
              defaultValue="Tất cả"
              options={[
                { value: "", label: "Tất cả" },
                { value: "", label: "Đang chờ" },
                { value: "", label: "Đã sử dụng" },
                { value: "", label: "Bỏ qua" },
              ]}
            />
          </div>
          <div>
            <Form>Nguồn cấp</Form>
            <Select
              defaultValue="Tất cả"
              options={[
                { value: "", label: "Tất cả" },
                { value: "", label: "Kiosk" },
                { value: "", label: "Hệ thống" },
              ]}
            />
          </div>
          <div>
            <Form>Chọn thời gian</Form>
            <RangePicker></RangePicker>
          </div>
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
            <Link to="/post-number" className="btn-text-post">
              Cấp số mới
            </Link>
          </Button>
        </div>
      </Content>
    </>
  );
};

export default CapSo;

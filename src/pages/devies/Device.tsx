import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Space, Table } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { ColumnProps } from "antd/lib/table";
import { useEffect } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices } from "../../redux/slices/deviceSlice";
type Device = {
  id: string;
  idDevice: string;
  name: string;
  ip: string;
  isActive: boolean;
  isConnect: boolean;
  service: string;
};

const columns: ColumnProps<Device>[] = [
  {
    title: "Mã thiết bị",
    dataIndex: "idDevice",
    key: "idDevice",
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
      <Space>
        <Link to={`/details-device/${record.id}`}>Chi tiết</Link>
        <Link to={`/update-device/${record.id}`}>Cập nhật</Link>
      </Space>
    ),
  },
];

const Device = () => {
  const dispatch: any = useDispatch();
  const data = useSelector((state: RootState) => state.devices.devices);

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  return (
    <>
      <Content className="">
        <HeaderPage label="Thiết bị" />
        <div className="title-page" style={{ padding: "0 50px" }}>
          Danh sách thiết bị
        </div>
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
        <div className="d-flex">
          <div style={{ flex: 1 }}>
            <Table
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
    </>
  );
};

export default Device;

import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Space, Table, Badge } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { ColumnProps } from "antd/lib/table";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices } from "../../redux/slices/deviceSlice";
import { SiderBar } from "../../components/Sidebar";
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
      isActive ? (
        <Badge status="success" text="Hoạt động"></Badge>
      ) : (
        <Badge status="error" text="Ngưng hoạt động"></Badge>
      ),
  },
  {
    title: "Trạng thái kết nối",
    dataIndex: "isConnect",
    key: "isConnect",
    render: (isConnect: boolean) =>
      isConnect ? (
        <Badge status="success" text="Kết nối"></Badge>
      ) : (
        <Badge status="error" text="Mất kết nối"></Badge>
      ),
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
  const [isActiveFilter, setIsActiveFilter] = useState<string>("");
  const [isConnectFilter, setIsConnectFilter] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const dispatch: any = useDispatch();
  const data = useSelector((state: RootState) => state.devices.devices);

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);
  
  const searchDevices = () => {
    let filterDevices = data;

    if (isActiveFilter !== "" && isActiveFilter !== "all") {
      filterDevices = filterDevices.filter(
        (device) => device.isActive === (isActiveFilter === "true")
      );
    }

    if (isConnectFilter !== "" && isConnectFilter !== "all") {
      filterDevices = filterDevices.filter(
        (device) => device.isConnect === (isConnectFilter === "true")
      );
    }

    if (keyword !== "") {
      filterDevices = filterDevices.filter(
        (device) =>
          device.idDevice.toLowerCase().includes(keyword.toLowerCase()) ||
          device.name.toLowerCase().includes(keyword.toLowerCase()) ||
          device.ip.toLowerCase().includes(keyword.toLowerCase()) ||
          device.service.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return filterDevices;
  };
  return (
    <>
      <SiderBar />

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
              defaultValue="Tất cả"
              style={{ width: 250, height: 40 }}
              options={[
                { value: "all", label: "Tất cả" },
                { value: "true", label: "Hoạt động" },
                { value: "false", label: "Ngưng hoạt động" },
              ]}
              onChange={(value) => setIsActiveFilter(value)}
              value={isActiveFilter}
            />
          </div>
          <div>
            <Form>Trạng thái kết nối</Form>
            <Select
              defaultValue="Tất cả"
              style={{ width: 250, height: 40 }}
              options={[
                { value: "all", label: "Tất cả" },
                { value: "true", label: "Kết nối" },
                { value: "false", label: "Mất kết nối" },
              ]}
              onChange={(value) => setIsConnectFilter(value)}
              value={isConnectFilter}
            />
          </div>
          <div style={{ marginLeft: "42%" }}>
            <Form>Từ khóa</Form>
            <Input.Search
              placeholder="Nhập từ khóa"
              style={{ width: 250, height: 40 }}
              allowClear
              onSearch={(value) => setKeyword(value)}
              onChange={(e) => setKeyword(e.target.value)}
            ></Input.Search>
          </div>
        </Space>
        <div className="d-flex">
          <div style={{ flex: 1 }}>
            <Table
              dataSource={searchDevices()}
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

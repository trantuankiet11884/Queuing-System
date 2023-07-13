import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Table,
  DatePicker,
  Badge,
} from "antd";
import HeaderPage from "../../components/Header";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import { ColumnProps } from "antd/lib/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchServices } from "../../redux/slices/serviceSlice";
import { SiderBar } from "../../components/Sidebar";

const { RangePicker } = DatePicker;
type Service = {
  id: string;
  idService: string;
  name: string;
  desc: string;
  isActive: boolean;
};

const columns: ColumnProps<Service>[] = [
  {
    title: "Mã dịch vụ",
    dataIndex: "idService",
    key: "idService",
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
    title: "Hành động",
    key: "action",
    render: (text: any, record: Service) => (
      <Space size="middle">
        <Link to={`/details-service/${record.id}`}>Chi tiết</Link>
        <Link to={`/update-service/${record.id}`}>Cập nhật</Link>
      </Space>
    ),
  },
];

const Service = () => {
  const [isActiveFilter, setIsActiveFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");

  const dispatch: any = useDispatch();
  const data = useSelector((state: RootState) => state.service.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const searchDevices = () => {
    let filterDevices = data;

    if (isActiveFilter !== "" && isActiveFilter !== "all") {
      filterDevices = filterDevices.filter(
        (device) => device.isActive === (isActiveFilter === "true")
      );
    }

    if (keyword !== "") {
      filterDevices = filterDevices.filter(
        (device) =>
          device.idService.toLowerCase().includes(keyword.toLowerCase()) ||
          device.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return filterDevices;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SiderBar />

      <Content>
        <HeaderPage label="Dịch vụ" />
        <div className="title-page" style={{ padding: "0 50px" }}>
          Quản lý dịch vụ
        </div>
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
                { value: "all", label: "Tất cả" },
                { value: "true", label: "Hoạt động" },
                { value: "false", label: "Ngưng hoạt động" },
              ]}
              onChange={(value) => setIsActiveFilter(value)}
              value={isActiveFilter}
            />
          </div>
          <div>
            <Form>Chọn thời gian</Form>
            <RangePicker className="mb-2" />
          </div>
          <div style={{ marginLeft: "8rem" }}>
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
              className="h-100"
              dataSource={searchDevices()}
              columns={columns}
              rowKey={(record: Service) => record.id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                padding: "0 5rem 0 3rem",
              }}
              pagination={{
                current: currentPage,
                pageSize: 3,
                onChange: handlePageChange,
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
    </>
  );
};

export default Service;

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
import { useState, useEffect } from "react";

import { ColumnProps } from "antd/lib/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchCapSo } from "../../redux/slices/capsoSlice";
import { SiderBar } from "../../components/Sidebar";
import moment from "moment";

const { RangePicker } = DatePicker;
interface CapSo {
  id: string;
  numberService: number;
  nameCustomer: string;
  nameService: string;
  grantTime: string;
  expiry: string;
  nameDevice: string;
  status: string;
}

const columns: ColumnProps<CapSo>[] = [
  {
    title: "Số thứ tự",
    dataIndex: "numberService",
    key: "numberService",
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
    dataIndex: "nameDevice",
    key: "nameDevice",
  },
  {
    title: "Trạng thái ",
    dataIndex: "status",
    render: (text: any, record: CapSo) => {
      switch (record.status) {
        case "Đã sử dụng":
          return <Badge status="default" text={record.status} />;
        case "Đang chờ":
          return <Badge status="processing" text={record.status} />;
        default:
          return <Badge status="error" text={record.status} />;
      }
    },
  },
  {
    title: "Hành động",
    key: "action",
    render: (text: any, record: CapSo) => (
      <Space size="middle">
        <Link to={`/details-number/${record.id}`}>Chi tiết</Link>
      </Space>
    ),
  },
];

const CapSo = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchNameService, setSearchNameService] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [searchSource, setSearchSource] = useState<string>("");

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const dispatch: any = useDispatch();
  const data = useSelector((state: RootState) => state.levelNum.capSo);
  useEffect(() => {
    dispatch(fetchCapSo());
  }, dispatch);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchNameService = (value: string) => {
    setSearchNameService(value);
  };

  const handleSearchStatus = (value: string) => {
    setSearchStatus(value);
  };

  const handleSearchSource = (value: string) => {
    setSearchSource(value);
  };

  const handleSearchKeyword = (value: string) => {
    setSearchKeyword(value);
  };

  const filterData = (data: CapSo[]) => {
    let filteredData = data;

    if (searchNameService !== "" && searchNameService !== "all") {
      filteredData = filteredData.filter(
        (item) => item.nameService === searchNameService
      );
    }

    if (searchStatus !== "" && searchStatus !== "all") {
      filteredData = filteredData.filter(
        (item) => item.status === searchStatus
      );
    }

    if (searchSource !== "" && searchSource !== "all") {
      filteredData = filteredData.filter(
        (item) => item.nameDevice === searchSource
      );
    }

    if (searchKeyword !== "") {
      filteredData = filteredData.filter(
        (item) =>
          item.nameService
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          item.nameDevice.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    return filteredData;
  };
  return (
    <>
      <SiderBar />
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
              // value="Tất cả"
              options={[
                { value: "all", label: "Tất cả" },
                { value: "Khám sản - Phụ khoa", label: "Khám sản - Phụ khoa" },
                { value: "Khám răng hàm mặt", label: "Khám răng hàm mặt" },
                { value: "Khám tai mũi họng", label: "Khám tai mũi họng" },
                { value: "Khám mắt", label: "Khám mắt" },
                { value: "Khám tim mạch", label: "Khám tim mạch" },
              ]}
              onChange={(value) => handleSearchNameService(value)}
            />
          </div>
          <div>
            <Form>Tình trạng</Form>
            <Select
              defaultValue="Tất cả"
              options={[
                { value: "all", label: "Tất cả" },
                { value: "Đang chờ", label: "Đang chờ" },
                { value: "Đã sử dụng", label: "Đã sử dụng" },
                { value: "Bỏ qua", label: "Bỏ qua" },
              ]}
              onChange={(value) => handleSearchStatus(value)}
            />
          </div>
          <div>
            <Form>Nguồn cấp</Form>
            <Select
              defaultValue="Tất cả"
              options={[
                { value: "all", label: "Tất cả" },
                { value: "Kiosk", label: "Kiosk" },
                { value: "Hệ thống", label: "Hệ thống" },
              ]}
              onChange={(value) => handleSearchSource(value)}
            />
          </div>
          <div>
            <Form>Chọn thời gian</Form>
            <RangePicker></RangePicker>
          </div>
          <div className="ms-3">
            <Form>Từ khóa</Form>
            <Input.Search
              placeholder="Nhập từ khóa"
              onSearch={(value) => handleSearchKeyword(value)}
              onChange={(e) => setSearchKeyword(e.target.value)}
            ></Input.Search>
          </div>
        </div>
        <div className="d-flex">
          <div style={{ flex: 1 }}>
            <Table
              className="h-100"
              dataSource={filterData(data)}
              rowKey={(record: CapSo) => record.id}
              columns={columns}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                padding: "0 5rem 0 3rem",
              }}
              pagination={{
                current: currentPage,
                pageSize: 4,
                onChange: handlePageChange,
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

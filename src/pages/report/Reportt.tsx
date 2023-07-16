import { Content } from "antd/es/layout/layout";
import { Button, Form, Table, DatePicker, Badge } from "antd";
import HeaderPage from "../../components/Header";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ColumnProps } from "antd/lib/table";
import { SiderBar } from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as XLSX from "xlsx";
const { RangePicker } = DatePicker;
interface Reportt {
  id: string;
  numberService: number;
  nameService: string;
  grantTime: string;
  nameDevice: string;
  status: string;
}

const columns: ColumnProps<Reportt>[] = [
  {
    title: "Số thứ tự",
    dataIndex: "numberService",
    key: "numberService",
    sorter: (a, b) => a.numberService - b.numberService,
  },

  {
    title: "Tên dịch vụ",
    dataIndex: "nameService",
    key: "nameService",
    sorter: (a, b) => {
      if (a.nameService < b.nameService) {
        return -1;
      }
      if (a.nameService > b.nameService) {
        return 1;
      }
      return 0;
    },
  },
  {
    title: "Thời gian cấp",
    dataIndex: "grantTime",
    key: "grantTime",
    sorter: (a, b) => {
      if (a.grantTime < b.grantTime) {
        return -1;
      }
      if (a.grantTime > b.grantTime) {
        return 1;
      }
      return 0;
    },
  },

  {
    title: "Trạng thái ",
    dataIndex: "status",
    render: (text: any, record: Reportt) => {
      switch (record.status) {
        case "Đã sử dụng":
          return <Badge status="default" text={record.status} />;
        case "Đang chờ":
          return <Badge status="processing" text={record.status} />;
        default:
          return <Badge status="error" text={record.status} />;
      }
    },
    sorter: (a, b) => {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    },
  },
  {
    title: "Nguồn cấp",
    dataIndex: "nameDevice",
    key: "nameDevice",
    sorter: (a, b) => {
      if (a.nameDevice < b.nameDevice) {
        return -1;
      }
      if (a.nameDevice > b.nameDevice) {
        return 1;
      }
      return 0;
    },
  },
];

const Reportt = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const data = useSelector((state: RootState) => state.levelNum.capSo);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchReport = () => {
    const filterReport = [...data];

    filterReport.sort((a, b) => a.numberService - b.numberService);

    return filterReport;
  };

  const handleDownload = () => {
    const exportData = handleSearchReport().map(({ id, ...rest }, index) => ({
      STT: index + 1,
      Name: rest.nameService,
      GrantTime: rest.grantTime,
      Status: rest.status,
      Inventory: rest.nameDevice,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, "report.xlsx");
  };

  return (
    <>
      <SiderBar />

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
              dataSource={handleSearchReport()}
              columns={columns}
              rowKey={(record: Reportt) => record.id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                padding: "0 6rem 0 3rem",
              }}
              pagination={{
                current: currentPage,
                pageSize: 5,
                onChange: handlePageChange,
              }}
            />
          </div>
          <Button
            style={{ height: 50 }}
            className=" btn-post d-flex flex-column align-items-center"
            onClick={handleDownload}
          >
            <PlusSquareOutlined />
            <p className="btn-text-post text-white">Tải về</p>
          </Button>
        </div>
      </Content>
    </>
  );
};

export default Reportt;

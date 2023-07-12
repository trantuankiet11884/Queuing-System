import { Content } from "antd/es/layout/layout";
import { Button, Form, Table, DatePicker } from "antd";
import HeaderPage from "../../components/Header";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { ColumnProps } from "antd/lib/table";
import { SiderBar } from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchCapSo } from "../../redux/slices/capsoSlice";
import CapSo from "../levelmanagment/Capso";

const { RangePicker } = DatePicker;
type Reportt = {
  id: string;
  numberService: number;
  nameService: string;
  grantTime: string;
  nameDevice: string;
  status: string;
};

const columns: ColumnProps<Reportt>[] = [
  {
    title: "Số thứ tự",
    dataIndex: "numberService",
    key: "numberService",
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
    dataIndex: "nameDevice",
    key: "nameDevice",
  },
];

const Reportt = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch: any = useDispatch();
  const data = useSelector((state: RootState) => state.levelNum.capSo);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              dataSource={data}
              columns={columns}
              rowKey={(record: Reportt) => record.id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                padding: "0 95px 0 50px",
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

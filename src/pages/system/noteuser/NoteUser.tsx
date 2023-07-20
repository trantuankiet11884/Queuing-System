import { Content } from "antd/es/layout/layout";
import { Form, Input, Table, DatePicker } from "antd";
import HeaderPage from "../../../components/Header";
import { ColumnProps } from "antd/lib/table";
import { SiderBar } from "../../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState, useEffect } from "react";
import { fetchLogger } from "../../../redux/slices/activityLogger";
const { RangePicker } = DatePicker;

interface NoteUser {
  hvten: string;
  grantTime: string;
  ip: string;
  actions: string;
}

const NoteUser = () => {
  const columns: ColumnProps<NoteUser>[] = [
    {
      title: "Tên đăng nhập",
      dataIndex: "hvten",
      key: "hvten",
    },
    {
      title: "Thời gian tác động",
      dataIndex: "grantTime",
      key: "grantTime",
    },
    {
      title: "Ip thực hiện",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Thao tác thực hiện",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const dispatch: any = useDispatch();
  const dataLogger = useSelector((state: RootState) => state.actions.logger);

  useEffect(() => {
    dispatch(fetchLogger());
  }, [dispatch]);

  return (
    <>
      <SiderBar />
      <Content>
        <HeaderPage label="Dịch vụ" />
        <div className=" ms-5 me-5 pe-5 d-flex justify-content-between">
          <div>
            <Form>Tên vai trò</Form>
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
              dataSource={dataLogger}
              columns={columns}
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
        </div>
      </Content>
    </>
  );
};

export default NoteUser;

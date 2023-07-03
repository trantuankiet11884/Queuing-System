import { Content } from "antd/es/layout/layout";
import { Form, Input, Table, DatePicker } from "antd";
import HeaderPage from "../../../components/Header";
import { ColumnProps } from "antd/lib/table";
import { SiderBar } from "../../../components/Sidebar";
const { RangePicker } = DatePicker;

type NoteUser = {
  username: string;
  time: string;
  action: string;
  ipAddress: string;
};

const columns: ColumnProps<NoteUser>[] = [
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
  },

  {
    title: "Thời gian tác động",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Ip thực hiện",
    dataIndex: "ipAddress",
    key: "ipAddress",
  },
  {
    title: "Thao tác thực hiện",
    dataIndex: "action",
    key: "action",
  },
];

const NoteUser = () => {
  return (
    <>
      <SiderBar/>
      
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
        </div>
      </Content>
    </>
  );
};

export default NoteUser;

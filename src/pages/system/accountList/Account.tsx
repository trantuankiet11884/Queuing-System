import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Space, Table, Badge } from "antd";
import HeaderPage from "../../../components/Header";
import { PlusSquareOutlined } from "@ant-design/icons";
import * as React from "react";
import { useState, useEffect } from "react";

import { ColumnProps } from "antd/lib/table";
import { SiderBar } from "../../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { fetchAccount } from "../../../redux/slices/accountSlice";

export interface Account {
  id: string;
  username: string;
  hvten: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
}

const columns: ColumnProps<Account>[] = [
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
  },

  {
    title: "Họ tên",
    dataIndex: "hvten",
    key: "hvten",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
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
    render: (text: any, record: Account) => (
      <Space size="middle">
        <Link to={`/update-account/${record.id}`}>Cập nhật</Link>
      </Space>
    ),
  },
];

const AccountPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchRole, serSearchRole] = useState<string>("");

  const dispatch: any = useDispatch();
  const data = useSelector((state: RootState) => state.account.account);

  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const searchAccount = () => {
    let filterAccount = data;

    if (searchRole !== "" && searchRole !== "all") {
      filterAccount = filterAccount.filter(
        (role) => role.isActive === (searchRole === "true")
      );
    }
    return filterAccount;
  };
  return (
    <>
      <SiderBar />

      <Content>
        <HeaderPage label="Dịch vụ" />
        <div className="title-page" style={{ padding: "0 50px" }}>
          Danh sách tài khoản
        </div>
        <div className=" ms-5 me-5 pe-5 d-flex justify-content-between">
          <div>
            <Form>Tên vai trò</Form>
            <Select
              style={{ width: 130 }}
              defaultValue="Tất cả"
              options={[
                { value: "all", label: "Tất cả" },
                { value: "true", label: "Hoạt động" },
                { value: "false", label: "Ngưng hoạt động" },
              ]}
              onChange={(value) => serSearchRole(value)}
              value={searchRole}
            ></Select>
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
              dataSource={searchAccount()}
              columns={columns}
              rowKey={(record: Account) => record.id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                padding: "0 95px 0 50px",
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
            <Link to="/post-account" className="btn-text-post">
              Thêm tài khoản
            </Link>
          </Button>
        </div>
      </Content>
    </>
  );
};

export default AccountPage;

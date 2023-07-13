import { Avatar, Card, Col, Form, Input, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as React from "react";
import { useState, useEffect } from "react";
import { fetchAccount } from "../../redux/slices/accountSlice";
import { SiderBar } from "../../components/Sidebar";

const Profile = () => {
  const dispatch: any = useDispatch();
  const data = useSelector((state: RootState) => state.account.currentAccount);
  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]);

  return (
    <>
      <SiderBar />
      <Content>
        <HeaderPage label="Thông tin cá nhân"></HeaderPage>
        <div className="profile-content__card d-flex justify-content-evenly mt-5">
          <Card style={{ width: "1000px", height: 310 }}>
            <Row className="d-flex">
              <Col className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                  alt="avatar"
                  className="avatar"
                  width={40}
                  height={40}
                />
                <div>
                  <p className="profile-username mt-1">{data?.hvten}</p>
                </div>
              </Col>
              <Col style={{ margin: "0 20px" }}>
                <Form layout="vertical">
                  <Form.Item label="Tên người dùng">
                    <Input
                      style={{ width: "300px" }}
                      value={data?.hvten}
                      disabled
                    />
                  </Form.Item>
                  <Form.Item label="Số diện thoại">
                    <Input
                      style={{ width: "300px" }}
                      value={data?.phone}
                      disabled
                    />
                  </Form.Item>
                  <Form.Item label="Email:">
                    <Input
                      style={{ width: "300px" }}
                      value={data?.email}
                      disabled
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                <Form layout="vertical">
                  <Form.Item label="Tên đăng nhập">
                    <Input
                      style={{ width: "300px" }}
                      value={data?.username}
                      disabled
                    />
                  </Form.Item>
                  <Form.Item label="Mật khẩu">
                    <Input
                      style={{ width: "300px" }}
                      value={data?.password}
                      disabled
                    />
                  </Form.Item>
                  <Form.Item label="Vai trò:">
                    <Input
                      style={{ width: "300px" }}
                      value={data?.role}
                      disabled
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </div>
      </Content>
    </>
  );
};

export default Profile;

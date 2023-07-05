import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { Button, Card, Col, Form, Row } from "antd";
import { Link, useParams } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SiderBar } from "../../components/Sidebar";

const CapSoChiTiet = () => {
  const { id } = useParams<{ id: string }>();

  const capSo: any = useSelector((state: RootState) =>
    state.levelNum.capSo.find((d) => d.id === id)
  );

  if (!capSo) {
    return <div className="h1">Không tìm thấy </div>;
  }

  return (
    <>
      <SiderBar />

      <Content>
        <HeaderPage label="Chi tiết"></HeaderPage>
        <div className="title-page" style={{ padding: "0 50px" }}>
          Quản lý cấp sô
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Card style={{ width: 900, height: 470 }}>
            <p>Thông tin cấp số</p>
            <Row className="d-flex justify-content-between">
              <Col>
                <Form layout="horizontal">
                  <Form.Item label="Họ tên">{capSo.nameCustomer}</Form.Item>
                  <Form.Item label="Tên dịch vụ">{capSo.nameService}</Form.Item>
                  <Form.Item label="Số thứ tự">{capSo.numberService}</Form.Item>
                  <Form.Item label="Thời gian cấp">{capSo.grantTime}</Form.Item>
                  <Form.Item label="Hạn sử dụng">{capSo.expiry}</Form.Item>
                </Form>
              </Col>
              <Col>
                <Form layout="horizontal">
                  <Form.Item label="Nguồn cấp">{capSo.nameDevice}</Form.Item>
                  <Form.Item label="Trạng thái">{capSo.status}</Form.Item>
                  <Form.Item label="Số điện thoại">0975864269</Form.Item>
                  <Form.Item label="Địa chỉ email">
                    anguyenvan@gmail.com
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                <Button className=" btn-post d-flex flex-column align-items-center">
                  <RollbackOutlined />

                  <Link to="/" className="btn-text-post">
                    Quay lại
                  </Link>
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      </Content>
    </>
  );
};

export default CapSoChiTiet;

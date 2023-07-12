import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { ColumnProps } from "antd/lib/table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormOutlined, RollbackOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { SiderBar } from "../../components/Sidebar";
import * as React from "react";
import { useState, useEffect } from "react";
import CapSo from "../levelmanagment/Capso";
import { fetchCapSo } from "../../redux/slices/capsoSlice";

interface Detail extends CapSo {
  numberService: number;
  status: string;
}

const columns: ColumnProps<Detail>[] = [
  {
    title: "Số thứ tự",
    dataIndex: "numberService",
    key: "numberService",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (text: any, record: CapSo) => {
      switch (record.status) {
        case "Đã sử dụng":
          return <Badge status="success" text="Đã hoàn thành" />;
        case "Đang chờ":
          return <Badge status="processing" text="Đang thực hiện" />;
        default:
          return <Badge status="default" text="Vắng" />;
      }
    },
  },
];

const { RangePicker } = DatePicker;
const DetailService = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { id } = useParams<{ id: string }>();

  const service = useSelector((state: RootState) =>
    state.service.services.find((s) => s.id === id)
  );

  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.levelNum.capSo);

  useEffect(() => {
    dispatch(fetchCapSo());
  }, [dispatch]);

  if (!service) {
    return <div className="h1">Không tìm thấy thiết bị</div>;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SiderBar />

      <Content>
        <HeaderPage label="Dịch vụ"></HeaderPage>
        <div className="title-page" style={{ padding: "0 50px" }}>
          Quản lý dịch vụ
        </div>
        <div className="mt-5">
          <Row>
            <Col className="mx-1" span={7}>
              <Card>
                <p className="h4">Thông tin dịch vụ</p>
                <p>
                  <Form.Item style={{ marginBottom: 0 }} label="Mã dịch vụ">
                    {service.idService}
                  </Form.Item>
                </p>
                <p>
                  <Form.Item style={{ marginBottom: 0 }} label="Tên dịch vụ">
                    {service.name}
                  </Form.Item>
                </p>
                <p>
                  <Form.Item style={{ marginBottom: 0 }} label="Mô tả">
                    {service.desc}
                  </Form.Item>
                </p>
                <p className="h4">Quy tắc cấp số</p>
                <p>
                  <Form.Item style={{ marginBottom: 0 }} label="Tăng tự động">
                    <Tag>0001</Tag> đến <Tag>9999</Tag>
                  </Form.Item>
                </p>
                <p>
                  <Form.Item style={{ marginBottom: 0 }} label="Prefix">
                    <Tag>0001</Tag>
                  </Form.Item>
                </p>
                <p>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Reset mỗi ngày"
                  ></Form.Item>
                  <p>Ví dụ: 201-2001</p>
                </p>
              </Card>
            </Col>
            <Col className="mx-1" span={15}>
              <Card>
                <div>
                  <Form
                    layout="vertical"
                    className="d-flex flex-row justify-content-between"
                  >
                    <Form.Item label="Trạng thái">
                      <Select
                        style={{ width: 150 }}
                        placeholder="Tất cả"
                        options={[
                          { value: "all", label: "Tất cả" },
                          { value: "Đã hoàn thành", label: "Đã hoàn thành" },
                          { value: "Đang thực hiện", label: "Đang thực hiện" },
                          { value: "Vắng", label: "Vắng" },
                        ]}
                      ></Select>
                    </Form.Item>
                    <Form.Item label="Chọn thời gian" className="mx-3">
                      <RangePicker />
                    </Form.Item>
                    <Form.Item label="Từ khóa">
                      <Input.Search />
                    </Form.Item>
                  </Form>
                </div>
                <div>
                  <Table
                    columns={columns}
                    dataSource={data.map((d) => ({
                      ...d,
                      key: d.id,
                      numberService: d.numberService,
                    }))}
                    pagination={{
                      current: currentPage,
                      pageSize: 3,
                      onChange: handlePageChange,
                    }}
                  />
                </div>
              </Card>
            </Col>
            <Col className="d-flex flex-column" span={1}>
              <div>
                <Button className=" btn-post d-flex flex-column align-items-center">
                  <FormOutlined />
                  <Link to="/" className="btn-text-post">
                    Cập nhật danh sách
                  </Link>
                </Button>
              </div>
              <div className="mt-5 pt-4">
                <Button
                  className=" btn-post  d-flex flex-column align-items-center"
                  onClick={handleGoBack}
                >
                  <RollbackOutlined />

                  <p className="btn-text-post text-white">Quay lại</p>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default DetailService;

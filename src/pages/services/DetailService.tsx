import {
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
import { Link } from "react-router-dom";
import { FormOutlined, RollbackOutlined } from "@ant-design/icons";

type Detail = {
  stt: string;
  status: string;
};

const columns: ColumnProps<Detail>[] = [
  {
    title: "Số thứ tự",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
];

const { RangePicker } = DatePicker;
const DetailService = () => {
  return (
    <>
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
                    201
                  </Form.Item>
                </p>
                <p>
                  <Form.Item style={{ marginBottom: 0 }} label="Tên dịch vụ">
                    Khám tim mạch
                  </Form.Item>
                </p>
                <p>
                  <Form.Item style={{ marginBottom: 0 }} label="Mô tả">
                    Chuyên các bệnh lý về tim
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
                          { value: "", label: "Đã hoàn thành" },
                          { value: "", label: "Đang thực hiện" },
                          { value: "", label: "Vắng" },
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
                  <Table columns={columns} />
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
                <Button className=" btn-post d-flex flex-column align-items-center">
                  <RollbackOutlined />

                  <Link to="/" className="btn-text-post">
                    Quay lại
                  </Link>
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

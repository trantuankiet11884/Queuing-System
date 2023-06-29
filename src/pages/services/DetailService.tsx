import { SiderBar } from "../../components/Sidebar";
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header";
import { ColumnProps } from "antd/lib/table";

const { RangePicker } = DatePicker;
const DetailService = () => {
  return (
    <>
      <Layout>
        <SiderBar />
        <Content>
          <HeaderPage label="Dịch vụ"></HeaderPage>
          <div>
            <Row>
              <Col span={7}>
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
              <Col span={15}>
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
                    <Table></Table>
                  </div>
                </Card>
              </Col>
              <Col span={2}>3</Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default DetailService;

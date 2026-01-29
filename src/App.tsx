import React, { useState } from "react";
import {
  Layout,
  Typography,
  Select,
  Input,
  Button,
  Card,
  Space,
  message,
  ConfigProvider,
  FloatButton,
  Row,
  Col,
} from "antd";
import {
  GiftOutlined,
  SendOutlined,
  RobotOutlined,
  HeartFilled,
} from "@ant-design/icons";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "./App.css";

const { Header, Content, Footer } = Layout;
const { Option, OptGroup } = Select;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [occasion, setOccasion] = useState("Sinh nhật");
  const [budget, setBudget] = useState("");
  const [recipient, setRecipient] = useState("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("Tất cả");
  const [result, setResult] = useState("");

  const handleConsult = async () => {
    if (!recipient || !budget) {
      return message.warning(
        "Đừng quên nhập đối tượng và ngân sách bạn nhé! ❤️",
      );
    }

    setLoading(true);
    // Prompt chi tiết hơn với Độ tuổi và Giới tính
    const prompt = `Hãy đóng vai một chuyên gia tư vấn quà tặng cực kỳ tinh tế và tâm lý. 
      Dịp: ${occasion}. 
      Đối tượng nhận: ${recipient}. 
      Giới tính: ${gender}. 
      Độ tuổi: ${age || "Không xác định"}. 
      Ngân sách: ${budget}.
      Hãy gợi ý 3-5 món quà ý nghĩa, phân tích lý do dựa trên tâm lý người nhận và lời chúc đi kèm. 
      Trình bày bằng Markdown, sử dụng icon phù hợp.`;

    try {
      const response = await axios.post(
        "https://groqprompt.netlify.app/api/ai",
        { prompt },
      );
      setResult(response.data.result);
    } catch (error) {
      message.error("Hình như AI đang bận gói quà rồi, thử lại sau nhé!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ConfigProvider giúp đồng bộ font và màu sắc cho ANTD
    <ConfigProvider
      theme={{ token: { fontFamily: "Be Vietnam Pro", fontWeightStrong: 700 } }}
    >
      <Layout style={{ minHeight: "100vh", background: "transparent" }}>
        <Header
          style={{
            background: "#fff",
            textAlign: "center",
            height: "auto",
            padding: 20,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "0 20px",
              background: "#fff1f0",
              borderRadius: "100px",
              marginBottom: "15px",
            }}
          >
            <GiftOutlined style={{ color: "#ff4d4f", fontSize: "24px" }} />
          </div>
          <Typography.Title
            level={1}
            style={{ color: "#ff4d4f", margin: 0, fontWeight: 700 }}
          >
            Tiệm Quà Ý Nghĩa
          </Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: "16px" }}>
            Giúp bạn chọn món quà chạm đến trái tim người nhận
          </Typography.Text>
        </Header>

        <Content
          style={{
            padding: "40px 20px",
            maxWidth: "800px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Card className="cozy-card">
            <Space
              orientation="vertical"
              style={{ width: "100%" }}
              size="large"
            >
              <div>
                <Typography.Text strong>Chọn dịp đặc biệt:</Typography.Text>
                <Select
                  defaultValue="Sinh nhật"
                  style={{ width: "100%", marginTop: 8 }}
                  onChange={setOccasion}
                  size="large"
                  showSearch // Cho phép gõ để tìm nhanh dịp lễ
                  placeholder="Tìm kiếm hoặc chọn dịp..."
                >
                  <OptGroup label="🎂 Sự kiện Cá nhân">
                    <Option value="Sinh nhật">🎂 Sinh nhật</Option>
                    <Option value="Kỷ niệm ngày cưới">
                      💑 Kỷ niệm ngày cưới
                    </Option>
                    <Option value="Đầy tháng / Thôi nôi">
                      👶 Đầy tháng / Thôi nôi
                    </Option>
                    <Option value="Lễ tốt nghiệp">🎓 Lễ tốt nghiệp</Option>
                    <Option value="Thăng chức">
                      📈 Thăng chức / Khen thưởng
                    </Option>
                    <Option value="Mừng thọ">👵 Mừng thọ</Option>
                  </OptGroup>

                  <OptGroup label="💍 Cưới hỏi & Nhà cửa">
                    <Option value="Đám hỏi">💍 Lễ Đám hỏi</Option>
                    <Option value="Đám cưới">💒 Lễ Đám cưới</Option>
                    <Option value="Tân gia">🏠 Khai trương / Tân gia</Option>
                  </OptGroup>

                  <OptGroup label="🧧 Lễ tiết Truyền thống">
                    <Option value="Tết Nguyên Đán">🧧 Tết Nguyên Đán</Option>
                    <Option value="Trung thu">🥮 Lễ Trung thu</Option>
                    <Option value="Lễ Vu Lan">🙏 Lễ Vu Lan (Báo hiếu)</Option>
                    <Option value="Giỗ chạp">🕯️ Đám giỗ / Tưởng niệm</Option>
                  </OptGroup>

                  <OptGroup label="💖 Ngày lễ Quốc tế">
                    <Option value="Valentine">❤️ Valentine (14/02)</Option>
                    <Option value="Quốc tế Phụ nữ">
                      🌹 Quốc tế Phụ nữ (08/03)
                    </Option>
                    <Option value="Phụ nữ Việt Nam">
                      💐 Phụ nữ Việt Nam (20/10)
                    </Option>
                    <Option value="Ngày của Mẹ">👩 Ngày của Mẹ</Option>
                    <Option value="Ngày của Cha">👨 Ngày của Cha</Option>
                    <Option value="Nhà giáo Việt Nam">
                      👨‍🏫 Nhà giáo Việt Nam (20/11)
                    </Option>
                    <Option value="Giáng sinh">🎄 Giáng sinh (Noel)</Option>
                  </OptGroup>

                  <OptGroup label="🤝 Công việc & Xã giao">
                    <Option value="Thăm bệnh">🍵 Thăm người ốm</Option>
                    <Option value="Xin lỗi">🙇 Lời xin lỗi chân thành</Option>
                    <Option value="Cảm ơn">🌸 Thay lời cảm ơn</Option>
                    <Option value="Ra mắt gia đình">
                      🏡 Ra mắt nhà người yêu
                    </Option>
                    <Option value="Chia tay đồng nghiệp">
                      ✈️ Chia tay / Đi xa
                    </Option>
                  </OptGroup>
                </Select>
              </div>

              <div>
                <Typography.Text strong>Thông tin người nhận:</Typography.Text>
                <Input
                  placeholder="VD: Người yêu thích vẽ, Sếp thích trà..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  style={{ marginTop: 8 }}
                  size="large"
                />
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <Typography.Text strong>Giới tính:</Typography.Text>
                  <Select
                    value={gender}
                    onChange={setGender}
                    style={{ width: "100%", marginTop: 8 }}
                    size="large"
                  >
                    <Option value="Nam">Nam</Option>
                    <Option value="Nữ">Nữ</Option>
                    <Option value="Khác">Khác</Option>
                    <Option value="Tất cả">Ưu tiên trung tính</Option>
                  </Select>
                </Col>
                <Col span={12}>
                  <Typography.Text strong>Độ tuổi:</Typography.Text>
                  <Input
                    placeholder="VD: 25, trung niên..."
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={{ marginTop: 8 }}
                    size="large"
                  />
                </Col>
              </Row>

              <div>
                <Typography.Text strong>
                  Ngân sách dự kiến của bạn:
                </Typography.Text>
                <Input
                  placeholder="VD: Dưới 1 triệu, tầm 500k..."
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{ marginTop: 8 }}
                  size="large"
                />
              </div>

              <Button
                type="primary"
                danger
                icon={<SendOutlined />}
                block
                loading={loading}
                onClick={handleConsult}
                className="btn-consult"
              >
                Nhận gợi ý tâm lý ngay
              </Button>
            </Space>
          </Card>

          {result && (
            <Card
              className="cozy-card"
              style={{ marginTop: "30px" }}
              title={
                <span style={{ color: "#ff4d4f" }}>
                  <RobotOutlined style={{ marginRight: 8 }} /> Chuyên gia AI gợi
                  ý cho bạn
                </span>
              }
            >
              <div className="markdown-content">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                >
                  {result}
                </ReactMarkdown>
              </div>
            </Card>
          )}
        </Content>

        <Footer
          style={{
            textAlign: "center",
            background: "transparent",
            paddingBottom: "40px",
          }}
        >
          Made with <HeartFilled style={{ color: "#ff4d4f" }} /> for meaningful
          gifts
        </Footer>

        <FloatButton.BackTop
          visibilityHeight={400} // Hiện nút sau khi cuộn xuống 400px
          className="back-to-top-btn"
          tooltip={<div>Quay lại đầu trang</div>}
          duration={600} // Tốc độ cuộn (ms)
        />
      </Layout>
    </ConfigProvider>
  );
};

export default App;

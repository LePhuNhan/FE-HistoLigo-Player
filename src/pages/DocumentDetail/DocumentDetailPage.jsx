import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  List,
  Typography,
  Row,
  Col,
  Button,
  PageHeader,
  Divider,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Menu from "../../components/Menu/Menu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./DocumentDetailPage.styles.css";
import imgRead from "../../assets/imageRead.png";

const DomainApi = process.env.REACT_APP_DOMAIN_API;
const { Header, Content } = Layout;
const { Title, Text } = Typography;

const countryCodeMap = {
  Vietnam: "VN",
  "United States": "US",
  Russia: "RU",
};

const DocumentDetail = () => {
  const [documents, setDocuments] = useState([]);
  const [references, setReferences] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTopicId = localStorage.getItem("selectedTopicId");
  const { id } = useParams();
  const selectedCountry = location.state?.selectedCountry || {
    name: "United States",
  };
  const countryCode = countryCodeMap[selectedCountry.name] || "US";
  const flagUrl = `https://cdn.jsdelivr.net/gh/umidbekk/react-flag-kit@1/assets/${countryCode}.svg`;

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`${DomainApi}/documentation/${id}`);
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
    console.log(documents);
  }, [selectedTopicId]);

  const renderContent = (content) => {
    const titles = content.match(/^(I+)\. .+$/gm) || [];

    const texts = [];
    let currentIndex = 0;

    titles.forEach((title, index) => {
      const startIndex = content.indexOf(title) + title.length;
      const endIndex =
        index < titles.length - 1
          ? content.indexOf(titles[index + 1])
          : undefined;
      const text = content.slice(startIndex, endIndex).trim();
      texts.push(text);
    });

    return (
      <div>
        {titles.length > 0 ? (
          titles.map((title, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <Title level={4}>{title}</Title>
              <Text>{texts[index]}</Text>
            </div>
          ))
        ) : (
          <Typography>No content available.</Typography>
        )}
      </div>
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Menu />
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            position: "fixed",
            width: "90%",
            zIndex: "100",
          }}
          className="header"
        >
          <div className="header-content-document">
            <div className="flag-container" role="img" aria-label="flag">
              <Link to="/chooseCountry">
                <img className="flag" src={flagUrl} alt="flag" />
              </Link>
            </div>
            <div className="fire-icon">🔥1</div>
          </div>
        </Header>
        <Content style={{ margin: "8% 5% 0% 0%" }} className="main">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ margin: "0 10% 0 10%" }}>
              <div style={{ display: "grid", alignItems: "center" }}>
                <Link to={`/learn/document/${selectedTopicId}`}>
                  <Button
                    type="link"
                    icon={<ArrowLeftOutlined />}
                    className="btnBack"
                  >
                    Back
                  </Button>
                </Link>

                <Divider
                  style={{ borderBlockStart: "2px solid rgba(5, 5, 5, 0.5)" }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img style={{ margin: "0 5% 0 0" }} src={imgRead} />
                  <Title level={4} className="documentTitle">
                    {documents.name || "Document Title"}
                  </Title>
                </div>
                <Divider
                  style={{ borderBlockStart: "2px solid rgba(5, 5, 5, 0.5)" }}
                />
              </div>

              {documents.content ? (
                renderContent(documents.content)
              ) : (
                <Typography style={{ marginTop: "16px" }}>
                  <Text>No content available.</Text>
                </Typography>
              )}
            </div>
            <div style={{ width: "40%" }} className="responsive-hide">
              <Card title="Leaderboards!" style={{ marginBottom: "16px" }} />
              <Card title="The references you have read">
                <List
                  size="small"
                  dataSource={references}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                      <Link to="/">
                        <Text className="references">{item}</Text>
                      </Link>
                    </List.Item>
                  )}
                />
              </Card>
              <Row gutter={[16, 16]} className="flex-container">
                <Link to="/">
                  <Col className="flex-item">
                    <h4>INTRODUCE</h4>
                  </Col>
                </Link>
                <Link to="/">
                  <Col className="flex-item">
                    <h4>EFFECTIVENESS</h4>
                  </Col>
                </Link>
                <Link to="/">
                  <Col className="flex-item">
                    <h4>JOB</h4>
                  </Col>
                </Link>
                <Link to="/">
                  <Col className="flex-item">
                    <h4>INVESTORS</h4>
                  </Col>
                </Link>
                <Link to="/">
                  <Col className="flex-item">
                    <h4>RULES</h4>
                  </Col>
                </Link>
                <Link to="/">
                  <Col className="flex-item">
                    <h4>PRIVACY</h4>
                  </Col>
                </Link>
              </Row>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DocumentDetail;

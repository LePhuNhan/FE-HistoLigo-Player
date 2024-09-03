import React, { useState, useEffect } from "react";
import { Layout, Card, List, Typography, Row, Col, Button } from "antd";
import Menu from "../../components/Menu/Menu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./DocumentPage.style.css";
import imgTest from "../../assets/imageBtn-test.png";
import imgDocument from "../../assets/imageBtn-document.png";
import imgStartDocument from "../../assets/imageDocument.png";

const DomainApi = process.env.REACT_APP_DOMAIN_API;
const { Header, Content } = Layout;
const { Title, Text } = Typography;

const countryCodeMap = {
  Vietnam: "VN",
  "United States": "US",
  Russia: "RU",
};

const Document = () => {
  const [documents, setDocuments] = useState([]);
  const [playerDocuments, setPlayerDocuments] = useState([]);
  const [references, setReferences] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTopicId } = useParams();
  const selectedCountry = location.state?.selectedCountry || {
    name: "United States",
  };
  const countryCode = countryCodeMap[selectedCountry.name] || "US";
  const flagUrl = `https://cdn.jsdelivr.net/gh/umidbekk/react-flag-kit@1/assets/${countryCode}.svg`;

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!selectedTopicId) return;

      try {
        const response = await axios.get(
          `${DomainApi}/documentation/topic/${selectedTopicId}`
        );
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
    
  }, [selectedTopicId]);

  const handleStartClick = async (documentId) => {
    navigate(`/documentDetail/${documentId}`);
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
            <div className="btn-test">
              <Link to={`/learn/test/${selectedTopicId}`}>
                <Button
                  className="button-test"
                  style={{
                    background: "#fff",
                  }}
                >
                  <img className="test" src={imgTest} />
                  TESTS
                </Button>
              </Link>
            </div>
            <div className="btn-document">
              <Link to={`/learn/document/${selectedTopicId}`}>
                <Button className="button-document">
                  <img className="document" src={imgDocument} />
                  DOCUMENTS
                </Button>
              </Link>
            </div>

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
            <div style={{ width: "60%", marginLeft: "5%" }} className="card">
              {documents.map((document, index) => {
                const titles = document.content.match(
                  /^(I+)\. .+$/gm
                );

                return (
                  <Card
                    key={index}
                    style={{ marginBottom: "16px" }}
                    className="learn-card"
                  >
                    <div className="cardDocument-content">
                      <div className="cardDocument">
                        <div className="cardDocument-text">
                          <Text>{document.name}</Text>
                        </div>
                        
                        {titles?.map((title, idx) => (
                          <Text className="text" key={idx}>
                            {title}
                          </Text>
                        ))}
                      </div>
                      <div className="cardDocument-img">
                        <img src={imgStartDocument} alt="Start Read" />
                        <div>
                          <Button
                            type="primary"
                            onClick={() => handleStartClick(document._id)}
                          >
                            START
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
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

export default Document;

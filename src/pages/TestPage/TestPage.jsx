import React, { useState, useEffect } from "react";
import { Layout, Card, List, Typography, Row, Col, Button } from "antd";
import Menu from "../../components/Menu/Menu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./TestPage.styles.css";
import imgTest from "../../assets/imageBtn-test.png";
import imgDocument from "../../assets/imageBtn-document.png";
import imgStartTest from "../../assets/ImgTest.png";
import { ThunderboltOutlined, ClockCircleOutlined } from "@ant-design/icons";

const DomainApi = process.env.REACT_APP_DOMAIN_API;
const { Header, Content } = Layout;
const { Title, Text } = Typography;

const countryCodeMap = {
  Vietnam: "VN",
  "United States": "US",
  Russia: "RU",
};

const Test = () => {
  const [tests, setTests] = useState([]);
  const [playerTests, setPlayerTests] = useState([]);
  const [references, setReferences] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTopicId } = useParams();
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const selectedCountry = location.state?.selectedCountry || {
    name: "United States",
  };
  const accessToken = localStorage.getItem("accessToken");
  const countryCode = countryCodeMap[selectedCountry.name] || "US";
  const flagUrl = `https://cdn.jsdelivr.net/gh/umidbekk/react-flag-kit@1/assets/${countryCode}.svg`;

  useEffect(() => {
    const fetchTests = async () => {
      if (!selectedTopicId) return;

      try {
        const response = await axios.get(
          `${DomainApi}/test/topic/${selectedTopicId}`
        );
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    const fetchPlayerTests = async () => {
      try {
        const response = await axios.get(`${DomainApi}/playerTest`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPlayerTests(response.data);
      } catch (error) {
        console.error("Error fetching player tests:", error);
      }
    };
    fetchTests();
    fetchPlayerTests();
  }, [accessToken, selectedTopicId]);

  const handleStartClick = async (testId) => {
    try {
      const playerTest = {
        testId: testId,
        time: 0,
        score: 0,
        questions: [],
      };

      const response = await axios.post(`${DomainApi}/playerTest`, playerTest, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      localStorage.setItem("playerTestId", response.data._id);
      navigate(`/test/${testId}`);
    } catch (error) {
      console.error("Error starting test:", error);
    }
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
          <div className="header-content-test">
            <div className="btn-test">
              <Link to={`/learn/test/${selectedTopicId}`}>
                <Button className="button-test">
                  <img className="test" src={imgTest} />
                  TESTS
                </Button>
              </Link>
            </div>
            <div className="btn-document">
              <Link to={`/learn/document/${selectedTopicId}`}>
                <Button
                  className="button-document"
                  style={{
                    background: "#fff",
                  }}
                >
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
              {tests.map((test, index) => {
                const playerTest = playerTests.find(
                  (pt) => pt.testId === test._id
                );

                return (
                  <Card
                    key={index}
                    style={{ marginBottom: "16px" }}
                    className="learn-card"
                  >
                    <div className="cardTest-content">
                      <div className="cardTest">
                        <div className="cardTest-text">
                          <Text>{test.name}</Text>
                        </div>
                        {playerTest && (
                          <div className="cardTest-record">
                            <div>
                              <ThunderboltOutlined
                                style={{
                                  fontSize: "2rem",
                                  color: "#fff",
                                  marginRight: "5px",
                                }}
                              />
                              <Text>Score: {playerTest.score.toFixed(2)}</Text>
                            </div>
                            <div>
                              <ClockCircleOutlined
                                style={{
                                  fontSize: "2rem",
                                  color: "#fff",
                                  marginRight: "5px",
                                }}
                              />
                              <Text>Time: {playerTest.time.toFixed(0)}s</Text>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="cardTest-img">
                        <img src={imgStartTest} alt="Start Test" />
                        <div>
                          <Button
                            type="primary"
                            onClick={() => handleStartClick(test._id)}
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

export default Test;

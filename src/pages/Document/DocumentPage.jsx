import React, { useState, useEffect } from "react";
import { Layout, Card, List, Typography, Row, Col, Button } from "antd";
import Menu from "../../components/Menu/Menu";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./DocumentPage.style.css";
import imgTest from "../../assets/imageBtn-test.png";
import imgDocument from "../../assets/imageBtn-document.png";
const { Header, Content } = Layout;
const { Title, Text } = Typography;

const countryCodeMap = {
  Vietnam: "VN",
  "United States": "US",
  Russia: "RU",
};

const Document = () => {
  const [topics, setTopics] = useState([]);
  const [playerProcess, setPlayerProcess] = useState(null);
  const [references, setReferences] = useState([]);
  const location = useLocation();
  const selectedCountry = location.state?.selectedCountry || {
    name: "United States",
  };
  const accessToken = localStorage.getItem("accessToken");
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const countryCode = countryCodeMap[selectedCountry.name] || "US";
  const { selectedTopicId } = useParams();
  const flagUrl = `https://cdn.jsdelivr.net/gh/umidbekk/react-flag-kit@1/assets/${countryCode}.svg`;
  const calculateProgress = (doneTest, totalTest) => {
    if (totalTest === 0) return 0;
    return Math.round((doneTest / totalTest) * 100);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const [topicsResponse, playerProcessResponse] = await Promise.all([
          axios.get(`${DomainApi}/topic`),
          axios.get(`${DomainApi}/playerProcess`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ]);
        const fetchedTopics = topicsResponse.data;
        const fetchedPlayerProcess = playerProcessResponse.data;

        const playerProcessTopicIds = new Set(
          fetchedPlayerProcess.topics.map((topic) => topic._id)
        );

        const filteredTopics = fetchedTopics.filter((topic) =>
          playerProcessTopicIds.has(topic._id)
        );

        setTopics(filteredTopics);
        setPlayerProcess(fetchedPlayerProcess);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, [selectedCountry.name]);

  const topicsWithProgress = topics.map((topic) => {
    const progressData = playerProcess?.topics.find((t) => t._id === topic._id);
    return {
      ...topic,
      doneTest: progressData?.doneTest || 0,
      totalTest: progressData?.totalTest || 0,
      score: progressData?.score || 0, // Add score from player process
      time: progressData?.time || 0, // Add time from player process
    };
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Menu />
      <Layout>
        <Header style={{
            background: "#fff",
            padding: 0,
            position: "fixed",
            width: "90%",
            zIndex: "100"
          }}>
          <div className="header-content-test">
            <div className="btn-test">
              <Link to={`/learn/test/${selectedTopicId}`}>
                <Button className="button-Test">
                  <img className="test" src={imgTest} />
                  TESTS
                </Button>
              </Link>
            </div>
            <div className="btn-document">
              <Link to={`/learn/document/${selectedTopicId}`}>
                <Button className="button-Document">
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
        <Content style={{ margin: "8% 5% 0% 0%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "60%", marginLeft: "5%" }} className="card">
              {topicsWithProgress.map((topic, index) => (
                <Card
                  key={index}
                  title={<Title level={4}>{topic.name}</Title>}
                  style={{ marginBottom: "16px" }}
                  className="learn-card"
                >
                  <div className="card-content">
                    <div className="card-text">
                      <Text className="text">{topic.description}</Text>
                      <div>
                        <Text>Score: {topic.score}</Text>
                      </div>
                      <div>
                        <Text>Time: {topic.time}s</Text>
                      </div>
                      <Button type="primary">
                        {topic.score > 0 ? "TRY AGAIN" : "START"}
                      </Button>
                    </div>
                    <img
                      className="card-image"
                      alt={topic.name}
                      src={topic.image}
                    />
                  </div>
                </Card>
              ))}
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

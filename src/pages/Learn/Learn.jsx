import React, { useState, useEffect } from "react";
import { Layout, Card, List, Typography, Progress, Row, Col } from "antd";
import Menu from "../../components/Menu/Menu";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Learn.styles.css";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const countryCodeMap = {
  Vietnam: "VN",
  "United States": "US",
  Russia: "RU",
};

const Learn = () => {
  const [topics, setTopics] = useState([]);
  const [playerProcess, setPlayerProcess] = useState(null);
  const [references, setReferences] = useState([]);
  const location = useLocation();
  const selectedCountry = location.state?.selectedCountry || { name: "United States" };
  const accessToken = localStorage.getItem("accessToken");
  const countryCode = countryCodeMap[selectedCountry.name] || "US";
  const flagUrl = `https://cdn.jsdelivr.net/gh/umidbekk/react-flag-kit@1/assets/${countryCode}.svg`;
  const calculateProgress = (doneTest, totalTest) => {
    if (totalTest === 0) return 0;
    return Math.round((doneTest / totalTest) * 100);
  };
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const [topicsResponse, playerProcessResponse] = await Promise.all([
          axios.get("http://localhost:8000/topic"),
          axios.get(`http://localhost:8000/playerProcess`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        ]);
        const fetchedTopics = topicsResponse.data;
        const fetchedPlayerProcess = playerProcessResponse.data;

        const playerProcessTopicIds = new Set(fetchedPlayerProcess.topics.map(topic => topic._id));

        const filteredTopics = fetchedTopics.filter(topic => playerProcessTopicIds.has(topic._id));

        setTopics(filteredTopics);
        setPlayerProcess(fetchedPlayerProcess);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    console.log('Selected Country Name:', selectedCountry.name);
    console.log('Country Code:', countryCode);
    fetchTopics();
  }, [selectedCountry.name]);
  const topicsWithProgress = topics.map(topic => {
    const progressData = playerProcess?.topics.find(t => t._id === topic._id);
    return {
      ...topic,
      doneTest: progressData?.doneTest || 0,
      totalTest: progressData?.totalTest || 0
    };
  });
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Menu />
      <Layout>
        <Header style={{ background: "#fff", padding: 0, position:"" }}>
          <div className="header-content">
            <div className="flag-container" role="img" aria-label="flag">
              <Link to="/chooseCountry">
                <img
                  className="flag"
                  src={flagUrl}
                  alt="flag"
                />
              </Link>
            </div>
            <div className="fire-icon">🔥1</div>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
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
                    <Progress 
                        percent={calculateProgress(topic.doneTest, topic.totalTest)} 
                        status="active" 
                      />
                      <Text className="text">{topic.description}</Text>
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
              <Card
                title="Leaderboards!"
                style={{ marginBottom: "16px" }}
              ></Card>
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

export default Learn;

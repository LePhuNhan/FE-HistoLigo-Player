import React, { useState, useEffect } from "react";
import { Layout, Card, Typography, Progress, Row, Col, List } from "antd";
import Menu from "../../components/Menu/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LearnPage.styles.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const countryCodeMap = {
  Vietnam: "VN",
  "United States": "US",
  Russia: "RU",
};

const Learn = () => {
  const [topics, setTopics] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCountry = location.state?.selectedCountry || {
    name: "United States",
  };
  const accessToken = localStorage.getItem("accessToken");
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const countryCode = countryCodeMap[selectedCountry.name] || "US";
  const flagUrl = `https://cdn.jsdelivr.net/gh/umidbekk/react-flag-kit@1/assets/${countryCode}.svg`;

  const calculateProgress = (doneTest, totalTest) => {
    if (totalTest === 0) return 0;
    return Math.round((doneTest / totalTest) * 100);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          `${DomainApi}/playerProcess/combindedTopic`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, [selectedCountry.name]);

  const handleTopicClick = (topicId) => {
    localStorage.setItem("selectedTopicId", topicId);
    navigate(`/learn/test/${topicId}`);
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
          <div className="header-content">
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
              {topics.map((topic, index) => (
                <Card
                  key={index}
                  style={{ marginBottom: "16px" }}
                  className="learn-card"
                  onClick={() => handleTopicClick(topic._id)}
                >
                  <div className="card-content">
                    <div className="card-text">
                      <Title level={4} className="learnTitle">
                        {topic.name}
                      </Title>
                      <Progress
                        percent={calculateProgress(
                          topic.doneTest,
                          topic.totalTest
                        )}
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
            <Sidebar />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Learn;
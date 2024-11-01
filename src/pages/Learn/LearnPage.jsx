import React, { useState, useEffect, useContext } from "react";
import { Layout, Card, Typography, Progress } from "antd";
import Menu from "../../components/Menu/Menu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LearnPage.styles.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DarkModeContext } from "../../DarkModeContext";
import {
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;



const Learn = () => {
  const theme = localStorage.getItem('theme') === 'true';
  const context = useContext(DarkModeContext);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const selectedClass = localStorage.getItem("selectedClass") || {
    name: "America",
  };
  const selectedClassId = localStorage.getItem("selectedClassId");
  const selectedClassImg = localStorage.getItem("selectedClassImg");
  const accessToken = localStorage.getItem("accessToken");
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const locale = "en-US";
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
              "Content-Language": `${locale}`,
            },
            params: {
              classId: selectedClassId
            }
          },
        );
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, [selectedClass.name]);

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
            width: "100%",
            zIndex: "100",
          }}
          className="header"
        >
          <div className="header-content">
            <div className="flag-container" role="img" aria-label="flag">
              <Link to="/chooseClass">
                <img
                  src={selectedClassImg}
                  alt={selectedClass}
                  style={{ width: 50, borderRadius: 1 }}
                  className="flag"
                />
              </Link>
            </div>

            <div className="fire-icon">🔥1</div>
            <div onClick={context.toggleTheme} className="toggleDarkMode">
              {theme ? <MoonOutlined /> : <SunOutlined />}
            </div>

          </div>
        </Header>
        <Content style={{ margin: "8% 2% 0% 14%" }} className="main">
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

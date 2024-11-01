import React, { useState, useEffect , useContext} from "react";
import { Layout, Card, Typography, Button } from "antd";
import Menu from "../../components/Menu/Menu";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./TestPage.styles.css";
import imgTest from "../../assets/imageBtn-test.png";
import imgCup from "../../assets/imageCup.png";
import imgDocument from "../../assets/imageBtn-document.png";
import imgStartTest from "../../assets/ImgTest.png";
import { ThunderboltOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DarkModeContext } from "../../DarkModeContext";
import {
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';


const DomainApi = process.env.REACT_APP_DOMAIN_API;
const { Header, Content } = Layout;
const { Text } = Typography;

const translations = {
  'en-US': {
    documents: "DOCUMENTS",
    tests: "TESTS",
    tryAgain: "TRY AGAIN",
    start: "START",
    time: "Time",
    score: "Score",
  },
  'vi-VN': {
    documents: "TÀI LIỆU",
    tests: "BÀI KIỂM TRA",
    tryAgain: "THỬ LẠI",
    start: "BẮT ĐẦU",
    time: "Thời gian",
    score: "Điểm",
  },
  'ru-RU': {
    documents: "ДОКУМЕНТЫ",
    tests: "ТЕСТЫ",
    tryAgain: "ПОВТОРИТЬ",
    start: "НАЧАТЬ",
    time: "Время",
    score: "Очки",
  },
};

const Test = () => {
  const theme = localStorage.getItem('theme') === 'true';
  const context = useContext(DarkModeContext);
  const [tests, setTests] = useState([]);
  const [playerTests, setPlayerTests] = useState([]);
  const navigate = useNavigate();
  const { selectedTopicId } = useParams();
  const selectedClass = localStorage.getItem("selectedClass") || {
    name: "America",
  };
  const selectedClassImg = localStorage.getItem("selectedClassImg");
  const accessToken = localStorage.getItem("accessToken");
  const locale = localStorage.getItem('locale') || 'en-US'; // Mặc định là 'en-US' nếu không có giá trị
  const lang = translations[locale] || translations['en-US']; // Lấy ngôn ngữ tương ứng hoặc mặc định

  useEffect(() => {
    const fetchTests = async () => {
      if (!selectedTopicId) return;

      try {
        const response = await axios.get(
          `${DomainApi}/test/topic/${selectedTopicId}`,{
            headers: {
              "Content-Language": `${locale}`,
            },
          }
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
            "Content-Language": `${locale}`,
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
            width: "100%",
            zIndex: "100",
          }}
          className="header"
        >
          <div className="header-content-test">
            <div className="btn-test">
              <Link to={`/learn/test/${selectedTopicId}`}>
                <Button className="button-test">
                  <img className="test" src={imgTest} alt="imgTest" />
                  {lang.tests}
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
                  <img
                    className="document"
                    src={imgDocument}
                    alt="imgDocument"
                  />
                  {lang.documents}
                </Button>
              </Link>
            </div>

            <div className="flag-container" role="img" aria-label="flag">
              <Link to="/chooseClass">
              <img
                    src={selectedClassImg}
                    alt={selectedClass}
                    style={{ width: 40, borderRadius: 1 }}
                    className="flag"
                  />
              </Link>
            </div>
            <div className="fire-icon">🔥1</div>
            <div onClick={context.toggleTheme} className="toggleDarkMode">
              {theme ? <MoonOutlined />:  <SunOutlined />}
            </div>
          </div>
        </Header>
        <Content style={{ margin: "8% 2% 0% 14%" }} className="main">
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
                        <div className="cardTest-record">
                          <div>
                            <ThunderboltOutlined
                              style={{
                                fontSize: "2rem",
                                color: "#fff",
                                marginRight: "5px",
                              }}
                            />
                            <Text>
                              {lang.score}: {(playerTest?.score || 0).toFixed(2)}
                            </Text>
                          </div>
                          <div>
                            <ClockCircleOutlined
                              style={{
                                fontSize: "2rem",
                                color: "#fff",
                                marginRight: "5px",
                              }}
                            />
                            <Text>
                              {lang.time}: {(playerTest?.time || 0).toFixed(0)}s
                            </Text>
                          </div>
                        </div>
                      </div>
                      <div className="cardTest-img">
                        {playerTest?.score > 0 && playerTest?.time > 0 ? (
                          <>
                            <img src={imgCup} alt="Congratulations" />
                            <div>
                              <Button
                                type="primary"
                                onClick={() => handleStartClick(test._id)}
                              >
                                {lang.tryAgain}
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <img src={imgStartTest} alt="Start Test" />
                            <div>
                              <Button
                            
                                type="primary"
                                onClick={() => handleStartClick(test._id)}
                              >
                                {lang.start}
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            <Sidebar />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Test;

import React, { useState, useEffect } from "react";
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

const DomainApi = process.env.REACT_APP_DOMAIN_API;
const { Header, Content } = Layout;
const { Text } = Typography;

const Test = () => {

  const [tests, setTests] = useState([]);
  const [playerTests, setPlayerTests] = useState([]);
  const navigate = useNavigate();
  const { selectedTopicId } = useParams();
  const selectedClass = localStorage.getItem("selectedClass") || {
    name: "America",
  };
  const selectedClassImg = localStorage.getItem("selectedClassImg");
  const accessToken = localStorage.getItem("accessToken");

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
                  <img
                    className="document"
                    src={imgDocument}
                    alt="imgDocument"
                  />
                  DOCUMENTS
                </Button>
              </Link>
            </div>

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
                              Score: {(playerTest?.score || 0).toFixed(2)}
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
                              Time: {(playerTest?.time || 0).toFixed(0)}s
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
                                TRY AGAIN
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
                                START
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

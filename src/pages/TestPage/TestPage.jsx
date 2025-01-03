import React, { useState, useEffect, useContext } from "react";
import { Layout, Card, Typography, Button } from "antd";
import Menu from "../../components/Menu/Menu";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./TestPage.styles.css";
import imgTest from "../../assets/imageBtn-test.png";
import imgCup from "../../assets/imageCup.png";
import imgDocument from "../../assets/imageBtn-document.png";
import imgStartTest from "../../assets/ImgTest.png";
import { ThunderboltOutlined, ClockCircleOutlined, BarsOutlined } from "@ant-design/icons";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DarkModeContext } from "../../DarkModeContext";
import {
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';
import FlagVN from "../../assets/vietnam-flag.png";
import FlagUS from "../../assets/us-flag.png";
import { Spin } from 'antd';


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
  const [loading, setLoading] = useState(true);
  const flag = localStorage.getItem("flag") === "true";
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
  const refreshToken = localStorage.getItem("refreshToken");
  const locale = localStorage.getItem('locale') || 'vi-VN'; // Mặc định là 'vi-VN' nếu không có giá trị
  const lang = translations[locale] || translations['vi-VN']; // Lấy ngôn ngữ tương ứng hoặc mặc định
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const fetchTests = async () => {
      if (!selectedTopicId) return;

      try {
        const response = await axios.get(
          `${DomainApi}/test/topic/${selectedTopicId}`, {
          headers: {
            "Content-Language": `${locale}`,
          },
        }
        );
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
      finally {
        setLoading(false); // Dừng loading sau khi fetch xong
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
      if (error.response && error.response.status === 401) {
        // Token hết hạn
        try {
          const refreshResponse = await axios.post(
            `${DomainApi}/user/refresh-token`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          const newAccessToken = refreshResponse.data.data.accessToken;

          // Lưu token mới vào localStorage
          localStorage.setItem("accessToken", newAccessToken);
          window.alert("Phiên của bạn đã hết hạn. Vui lòng tải lại trang để tiếp tục.");
          // Reload trang để token mới hoạt động
          window.location.reload();
        } catch (refreshError) {
          console.error("Làm mới token thất bại:", refreshError);
        }
      } else {
        console.error("Error fetching player process data:", error);
      }
    }
  };
  const handleChangeLanguage = () => {
    const language = !flag;
    localStorage.setItem("flag", language);
    localStorage.setItem("locale", language ? "en-US" : "vi-VN");
    window.location.reload();
  };

  const [width, setWidth] = useState(window.innerWidth); // Lấy chiều rộng ban đầu

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth); // Cập nhật khi kích thước thay đổi
    };

    window.addEventListener("resize", handleResize); // Lắng nghe sự kiện resize

    return () => {
      window.removeEventListener("resize", handleResize); // Hủy lắng nghe khi component bị unmount
    };
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Hàm cập nhật width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Lắng nghe sự kiện resize
    window.addEventListener('resize', handleResize);

    // Dọn dẹp khi component bị unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTopicClick = (topicId) => {
    localStorage.setItem("selectedTopicId", topicId);
    navigate(`/learn/test/${topicId}`);
  };



  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Menu />
      {openMenu ? <div onClick={() => {
        setOpenMenu(!openMenu);
      }} className="modalMenuBar d-block"></div> : null}
      {openMenu ? <div className="menuBar open">
        <Menu />
      </div> : <div className="menuBar">
        {windowWidth <= 480 || windowWidth <= 768 ? <Menu /> : null}
      </div>}
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

            <div onClick={() => {
              setOpenMenu(!openMenu);
            }} className="wrapMenuBarIcon">
              <BarsOutlined style={{ color: theme ? '#fff' : '#333' }} />
            </div>

            <div style={{ display: width <= 480 ? 'none' : 'block' }} className="btn-test">
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
            <div className="fire-icon">
              <Link to='/chooseLanguage'>
                <div onClick={() => {
                }} className="wrapChangeFlag">

                  <img
                    className="mainFlag"
                    src={flag ? FlagUS : FlagVN}
                    width="25px"
                    height="25px"
                    alt="vn"
                  ></img>
                </div>
              </Link>

            </div>
            <div onClick={context.toggleTheme} className="toggleDarkMode">
              {theme ? <MoonOutlined /> : <SunOutlined />}
            </div>
          </div>
        </Header>
        <Content style={{ margin: "8% 2% 0% 14%" }} className="main">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "60%", marginLeft: "5%", position: 'relative' }} className="card">
              {loading ? <Spin /> : null}
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

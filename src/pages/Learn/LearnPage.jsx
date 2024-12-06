import React, { useState, useEffect, useContext } from "react";
import { Layout, Card, Typography, Progress } from "antd";
import Menu from "../../components/Menu/Menu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LearnPage.styles.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DarkModeContext } from "../../DarkModeContext";
import { MoonOutlined, SunOutlined, BarsOutlined } from "@ant-design/icons";
import CoverBookImg from "../../assets/cover_book.webp";
import FlagVN from "../../assets/vietnam-flag.png";
import FlagUS from "../../assets/us-flag.png";
import { Spin } from 'antd';


const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Learn = () => {
  window.scrollTo(0, 0);
  const theme = localStorage.getItem("theme") === "true";
  const context = useContext(DarkModeContext);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const selectedClass = localStorage.getItem("selectedClass") || {
    name: "America",
  };
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const selectedClassId = localStorage.getItem("selectedClassId");
  const selectedClassImg = localStorage.getItem("selectedClassImg");
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const locale = localStorage.getItem("locale") || "vi-VN"; // Mặc định là 'en-US' nếu không có giá trị
  const flag = localStorage.getItem("flag") === "true";
  const calculateProgress = (doneTest, totalTest) => {
    if (totalTest === 0) return 0;
    return Math.round((doneTest / totalTest) * 100);
  };

  // const [flagLanguage, setFlagLanguage] = useState([]);


  // const fetchFlag = async () => {
  //   try {
  //     const response = await axios.get(`${DomainApi}/language`)
  //     setFlagLanguage(response.data);
  //   } catch (error) {
  //     console.error("Error fetching class data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchFlag();
  // }, []);


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
              classId: selectedClassId,
            },
          }
        );
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
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
      finally {
        setLoading(false); // Dừng loading sau khi fetch xong
      }
    };

    fetchTopics();
  }, [selectedClass.name]);

  // const handleChangeLanguage = () => {
  //   const language = !flag;
  //   localStorage.setItem("flag", language);
  //   localStorage.setItem("locale", language ? "en-US" : "vi-VN");
  //   window.location.reload();
  // };

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
        <Menu />
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


          <div className="header-content">

            <div onClick={() => {
              setOpenMenu(!openMenu);
            }} className="wrapMenuBarIcon">
              <BarsOutlined style={{ color: theme ? '#fff' : '#333' }} />
            </div>

            <div className="flag-container" role="img" aria-label="flag">
              <Link to="/chooseClass">
                <img
                  src={
                    selectedClassImg !== null ? selectedClassImg : CoverBookImg
                  }
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
                    src={
                      (flag ? FlagUS : FlagVN)
                    }
                    width="25px"
                    height="25px"
                    alt="vn"
                  />

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
              {loading ? (<Spin className="darkSpin" style={{ display: 'block', top: '300px' }} />) : (

                topics.map((topic, index) => (
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
                ))
              )}

            </div>

            <Sidebar />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Learn;

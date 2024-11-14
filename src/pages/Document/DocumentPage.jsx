import React, { useState, useEffect, useContext } from "react";
import { Layout, Card, Typography, Button } from "antd";
import Menu from "../../components/Menu/Menu";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./DocumentPage.style.css";
import imgTest from "../../assets/imageBtn-test.png";
import imgDocument from "../../assets/imageBtn-document.png";
import imgStartDocument from "../../assets/imageDocument.png";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DarkModeContext } from "../../DarkModeContext";
import {
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';
import FlagVN from "../../assets/vietnam-flag.png";
import FlagUS from "../../assets/us-flag.png";


const DomainApi = process.env.REACT_APP_DOMAIN_API;
const { Header, Content } = Layout;
const { Text } = Typography;

const translations = {
  'en-US': {
    tests: "TESTS",
    documents: "DOCUMENTS",
    start: "START",
  },
  'vi-VN': {
    tests: "BÀI KIỂM TRA",
    documents: "TÀI LIỆU",
    start: "BẮT ĐẦU",
  },
  'ru-RU': {
    tests: "ТЕСТЫ",
    documents: "ДОКУМЕНТЫ",
    start: "НАЧАТЬ",
  },
};

const Document = () => {
  const flag = localStorage.getItem("flag") === "true";
  const theme = localStorage.getItem('theme') === 'true';
  const context = useContext(DarkModeContext);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const { selectedTopicId } = useParams();
  const selectedClass = localStorage.getItem("selectedClass") || {
    name: "America",
  };
  const selectedClassId = localStorage.getItem("selectedClassId");
  const selectedClassImg = localStorage.getItem("selectedClassImg");
  const locale = localStorage.getItem('locale') || 'vi-VN';

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!selectedTopicId) return;

      try {
        const response = await axios.get(
          `${DomainApi}/documentation/topic/${selectedTopicId}`, {
          headers: {
            "Content-Language": `${locale}`,
          },
        }
        );
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
  }, [selectedTopicId]);

  const handleStartClick = async (documentId) => {
    localStorage.setItem("selectedDocumentId", documentId);
    navigate(`/documentDetail/${documentId}`);
  };

  const handleChangeLanguage = () => {
    const language = !flag;
    localStorage.setItem("flag", language);
    localStorage.setItem("locale", language ? "en-US" : "vi-VN");
    window.location.reload();
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
                  {translations[locale].tests}
                </Button>
              </Link>
            </div>
            <div className="btn-document">
              <Link to={`/learn/document/${selectedTopicId}`}>
                <Button className="button-document">
                  <img className="document" src={imgDocument} />
                  {translations[locale].documents}
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
              <div onClick={() => {
                handleChangeLanguage()
              }} className="wrapChangeFlag">

                <img
                  className="mainFlag"
                  src={flag ? FlagUS : FlagVN}
                  width="25px"
                  height="25px"
                  alt="vn"
                ></img>
              </div>

            </div>
            <div onClick={context.toggleTheme} className="toggleDarkMode">
              {theme ? <MoonOutlined /> : <SunOutlined />}
            </div>
          </div>
        </Header>
        <Content style={{ margin: "8% 2% 0% 14%" }} className="main">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "60%", marginLeft: "5%" }} className="card">
              {documents.map((document, index) => {
                const titles = document.content.match(/^(I+)\. .+$/gm);

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
                            {translations[locale].start}
                          </Button>
                        </div>
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

export default Document;

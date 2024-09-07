import React, { useState, useEffect } from "react";
import { Layout, Typography, Button, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Menu from "../../components/Menu/Menu";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./DocumentDetailPage.styles.css";
import imgRead from "../../assets/imageRead.png";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FlagIcon } from "react-flag-kit";

const DomainApi = process.env.REACT_APP_DOMAIN_API;
const { Header, Content } = Layout;
const { Title, Text } = Typography;

const countryCodeMap = {
  Vietnam: "VN",
  America: "US",
  Russia: "RU",
  France: "FR",
  Germany: "DE",
  Japan: "JP",
  Korea: "KR",
};

const DocumentDetail = () => {
  const [documents, setDocuments] = useState([]);
  const selectedTopicId = localStorage.getItem("selectedTopicId");
  const { id } = useParams();
  const selectedCountry = localStorage.getItem("selectedCountry") || {
    name: "America",
  };
  const countryCode = countryCodeMap[selectedCountry] || "US";

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`${DomainApi}/documentation/${id}`);
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
    console.log(documents);
  }, [selectedTopicId]);
  console.log(documents.content);

  const renderContent = (content) => {
    const titles = content.match(/^(I+)\. .+$/gm) || [];

    const texts = [];
    let currentIndex = 0;

    titles.forEach((title, index) => {
      const startIndex = content.indexOf(title) + title.length;
      const endIndex =
        index < titles.length - 1
          ? content.indexOf(titles[index + 1])
          : undefined;
      const text = content.slice(startIndex, endIndex).trim();
      texts.push(text);
    });

    return (
      <div>
        {titles.length > 0 ? (
          titles.map((title, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <Title level={4}>{title}</Title>
              <Text>{texts[index]}</Text>
            </div>
          ))
        ) : (
          <Typography>No content available.</Typography>
        )}
      </div>
    );
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
          <div className="header-content-document">
            <div className="flag-container" role="img" aria-label="flag">
              <Link to="/chooseCountry">
                <FlagIcon code={countryCode} className="flag" />
              </Link>
            </div>
            <div className="fire-icon">🔥1</div>
          </div>
        </Header>
        <Content style={{ margin: "8% 5% 0% 0%" }} className="main">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ margin: "0 10% 0 10%" }}>
              <div style={{ display: "grid", alignItems: "center" }}>
                <Link to={`/learn/document/${selectedTopicId}`}>
                  <Button
                    type="link"
                    icon={<ArrowLeftOutlined />}
                    className="btnBack"
                  >
                    Back
                  </Button>
                </Link>

                <Divider
                  style={{ borderBlockStart: "2px solid rgba(5, 5, 5, 0.5)" }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img style={{ margin: "0 5% 0 0" }} src={imgRead} />
                  <Title level={4} className="documentTitle">
                    {documents.name || "Document Title"}
                  </Title>
                </div>
                <Divider
                  style={{ borderBlockStart: "2px solid rgba(5, 5, 5, 0.5)" }}
                />
              </div>

              {documents.content ? (
                renderContent(documents.content)
              ) : (
                <Typography style={{ marginTop: "16px" }}>
                  <Text>No content available.</Text>
                </Typography>
              )}
            </div>
            <Sidebar />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DocumentDetail;

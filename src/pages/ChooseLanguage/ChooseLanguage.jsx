import React, { useState, useEffect } from "react";
import "./ChooseLanguage.css";
import Menu from "../../components/Menu/Menu";
import { Layout, theme, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Spin } from 'antd';


const { Content, Footer } = Layout;

const translations = {
  'en-US': {
    selectClass: "Select a language:",
    learn: "Learn",
  },
  'vi-VN': {
    selectClass: "Chọn một ngôn ngữ:",
    learn: "Học",
  },
  'ru-RU': {
    selectClass: "Выберите класс:",
    learn: "Учить",
  },
};

const ChooseLanguage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const accessToken = localStorage.getItem("accessToken");
  const locale = localStorage.getItem('locale') || 'vi-VN'; // Mặc định là 'vi-VN' nếu không có giá trị
  const lang = translations[locale] || translations['vi-VN']; // Lấy ngôn ngữ tương ứng hoặc mặc định

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${DomainApi}/language`)
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
    finally {
      setLoading(false); // Dừng loading sau khi fetch xong
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  console.log(classes);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleChangeLanguage = (label) => {
    const language = label === 'en-US';
    localStorage.setItem("flag", language);
    localStorage.setItem("locale", label === 'en-US' ? "en-US" : "vi-VN");
    // window.location.reload();
    console.log(label);
    window.location.href = "/learn";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Menu />
      <Layout>
        <Content style={{ margin: "0px 14px 0px 14%", position: 'relative' }}>
          {loading ? (<Spin />) : null}
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h3 className="Select_country">{lang.selectClass}</h3>
            <div className="country-icons">
              {classes.map((classroom) => (
                <Card
                  key={classroom._id}
                  className="country-icon"
                  onClick={() => {
                    handleChangeLanguage(classroom.name)
                  }}
                >
                  <img
                    src={classroom.image}
                    alt={classroom.name}
                    style={{ width: 120, borderRadius: 4 }}
                  />
                  <div>
                    <span>{classroom.name}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Content>
        <Footer className="footer">
          Histoligo ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ChooseLanguage;

import React, { useState, useEffect } from "react";
import "./ChooseCountry.style.css";
import Menu from "../../components/Menu/Menu";
import { Layout, theme, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Content, Footer } = Layout;

const ChooseCountry = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const accessToken = localStorage.getItem("accessToken");

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${DomainApi}/country`);
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleCountryClick = (country) => {
    localStorage.setItem("selectedCountryId", country._id);
    localStorage.setItem("selectedCountry", country.name);
    localStorage.setItem("selectedCountryImg", country.image);
    const fetchPlayerProcess = async () => {
      try {
        const response = await axios.post(
          `${DomainApi}/playerProcess`,
          { countryId: country._id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        navigate("/learn");
      } catch (error) {
        console.error("Error fetching player process data:", error);
      }
    };
    fetchPlayerProcess();
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Menu />
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h3 className="Select_country">Select a country:</h3>
            <div className="country-icons">
              {countries.map((country) => (
                <Card
                  key={country._id}
                  className="country-icon"
                  onClick={() => handleCountryClick(country)}
                >
                  <img
                    src={country.image}
                    alt={country.name}
                    style={{ width: 120, borderRadius: 4 }}
                  />
                  <div>
                    <span>{country.name}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Content>
        <Footer className="footer">
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ChooseCountry;

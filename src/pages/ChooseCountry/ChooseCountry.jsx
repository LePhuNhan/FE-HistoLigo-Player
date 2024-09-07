import React, { useState, useEffect } from "react";
import "./ChooseCountry.style.css";
import Menu from "../../components/Menu/Menu";
import { Layout, theme, Card } from "antd";
import { FlagIcon } from "react-flag-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Content, Footer } = Layout;

const countryCodeMap = {
  Vietnam: "VN",
  America: "US",
  Russia: "RU",
  France: "FR",
  Germany: "DE",
  Japan: "JP",
  Korea: "KR"
};

const ChooseCountry = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const DomainApi=process.env.REACT_APP_DOMAIN_API;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${DomainApi}/country`);
        console.log(response);
        
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryClick = (country) => {   
    localStorage.setItem("selectedCountry", country.name);
    navigate("/learn");
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
                  <FlagIcon code={countryCodeMap[country.name]} size={48} />
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

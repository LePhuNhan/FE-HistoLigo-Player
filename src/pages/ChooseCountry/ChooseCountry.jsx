import React, { useState } from "react";
import "./ChooseCountry.style.css";
import Menu from "../Menu/Menu";

import { Layout, theme } from "antd";
import { FlagIcon } from "react-flag-kit";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const countries = [
  { name: "USA", code: "US" },
  { name: "China", code: "CN" },
  { name: "Vietnam", code: "VN" },
];

const ChooseCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleCountryClick = () => {
    navigate("/learn"); // Navigate to the Learn page
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Menu />
      <Layout>
        <Header className="header" style={{ background: colorBgContainer }}>
          <div className="CC_icon">
            {selectedCountry && (
              <div className="selected-country">
                <FlagIcon code={selectedCountry.code} size={24} />
                <span>{selectedCountry.name}</span>
              </div>
            )}
          </div>
        </Header>
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
                <div
                  key={country.code}
                  className="country-icon"
                  onClick={handleCountryClick}
                >
                  <FlagIcon code={country.code} size={48} />
                  <span>{country.name}</span>
                </div>
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

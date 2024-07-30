import React, { useState } from "react";
import { Layout, Menu as AntMenu } from "antd";
import "./Menu.style.css";
import {
  FaChalkboardTeacher,
  FaTrophy,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaMobile,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const { Sider } = Layout;

// Define getItem function for menu items
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const accessToken = localStorage.getItem("accessToken"); // Get the accessToken from localStorage

  // Define menu items with new icons
  const items = [
    getItem(<Link to={`/learn/${accessToken}`}>Learn</Link>, "1", <FaChalkboardTeacher />),
    getItem(<Link to={`/leaderboard/${accessToken}`}>Leader Board</Link>, "2", <FaTrophy />),
    getItem(<Link to={`/profile/${accessToken}`}>Profile</Link>, "3", <FaUser />),
    getItem(
      "More",
      "4",
      <FaMobile />,
      [
        getItem(<Link to={`/settings/${accessToken}`}>Setting</Link>, "5", <FaCog />),
        getItem(<Link to={`/help/${accessToken}`}>Help</Link>, "6", <FaQuestionCircle />),
        getItem(<Link to={`/logout/${accessToken}`}>Logout</Link>, "7", <FaSignOutAlt />),
      ]
    ),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <h1 className="title">HISTOLIGO</h1>
      <AntMenu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        className="ant-layout-sider-children"
      />
    </Sider>
  );
};

export default Menu;

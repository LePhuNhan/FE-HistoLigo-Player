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

// Define getItem function for menu items
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Define menu items with new icons
const items = [
  getItem("Learn", "1", <FaChalkboardTeacher />),
  getItem("Leader Board", "2", <FaTrophy />),
  getItem("Profile", "3", <FaUser />),
  getItem("More", "4", <FaMobile />, [
    getItem("Setting", "5", <FaCog />),
    getItem("Help", "6", <FaQuestionCircle />),
    getItem("Logout", "7", <FaSignOutAlt />),
  ]),
];

const { Sider } = Layout;

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);

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

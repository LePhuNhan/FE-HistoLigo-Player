import React, { useState } from "react";
import { Layout, Menu as AntMenu } from "antd";
import { Link, useLocation } from "react-router-dom"; // Import Link và useLocation
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
  const location = useLocation(); // Get current location
  const currentPath = location.pathname; // Get current path

  // Define menu items with new icons
  const items = [
    getItem("Learn", "/learn", <FaChalkboardTeacher />),
    getItem("Leader Board", "/leaderboard", <FaTrophy />),
    getItem("Profile", "/profile", <FaUser />),
    getItem("More", "sub1", <FaMobile />, [
      getItem("Setting", "/settings", <FaCog />),
      getItem("Help", "/help", <FaQuestionCircle />),
      getItem("Logout", "/logout", <FaSignOutAlt />),
    ]),
  ];

  return (
    <Sider
      className="menu"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <h1 className="title">HISTOLIGO</h1>
      <AntMenu
        selectedKeys={[currentPath]} // Set selectedKeys based on current path
        mode="inline"
        className="ant-layout-sider-children"
      >
        {items.map((item) => 
          item.children ? ( // Check if item has children to render as SubMenu
            <AntMenu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((child) => (
                <AntMenu.Item key={child.key}>
                  <Link to={child.key}>{child.label}</Link>
                </AntMenu.Item>
              ))}
            </AntMenu.SubMenu>
          ) : (
            <AntMenu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}>{item.label}</Link>
            </AntMenu.Item>
          )
        )}
      </AntMenu>
    </Sider>
  );
};

export default Menu;

import React, { useContext, useState, useEffect} from "react";
import { Layout, Menu as AntMenu } from "antd";
import { Link, useLocation } from "react-router-dom";

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

const translations = {
  'en-US': {
    learn: "Learn",
    leaderboard: "Leader Board",
    profile: "Profile",
    more: "More",
    setting: "Setting",
    help: "Help",
    logout: "Logout",
  },
  'vi-VN': {
    learn: "Học",
    leaderboard: "Bảng Xếp Hạng",
    profile: "Hồ Sơ",
    more: "Thêm",
    setting: "Cài Đặt",
    help: "Trợ Giúp",
    logout: "Đăng Xuất",
  },
  'ru-RU': {
    learn: "Учить",
    leaderboard: "Таблица Лидеров",
    profile: "Профиль",
    more: "Больше",
    setting: "Настройки",
    help: "Помощь",
    logout: "Выйти",
  },
};

const Menu = () => {
  const theme = localStorage.getItem('theme') === 'true';
  console.log(theme);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // Get current location
  const currentPath = location.pathname; // Get current path
  const locale = localStorage.getItem('locale') || 'en-US'; // Mặc định là 'en-US' nếu không có giá trị
  const lang = translations[locale] || translations['en-US']; // Lấy ngôn ngữ tương ứng hoặc mặc định

  useEffect(() => {
    const darkThemeLink = document.getElementById('dark-theme-style');

    if (theme) {
      // Nếu theme là dark và file CSS chưa được thêm thì thêm vào
      if (!darkThemeLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/DarkMode.css';  // Đảm bảo đường dẫn đúng
        link.id = 'dark-theme-style';
        document.head.appendChild(link);
      }
    } else {
      // Nếu theme không phải là dark thì xóa file CSS dark mode
      if (darkThemeLink) {
        darkThemeLink.remove(); // Xóa hoàn toàn thẻ link
      }
    }
  }, [theme]);

  // Define menu items with new icons
  const items = [
    getItem(lang.learn, "/learn", <FaChalkboardTeacher />),
    getItem(lang.leaderboard, "/leaderboard", <FaTrophy />),
    getItem(lang.profile, "/profile", <FaUser />),
    getItem(lang.more, "sub1", <FaMobile />, [
      getItem(lang.setting, "/settings", <FaCog />),
      getItem(lang.help, "/help", <FaQuestionCircle />),
      getItem(lang.logout, "/logout", <FaSignOutAlt />),
    ]),
  ];

  return (
    <Sider
      className="menu cc"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      {/* <div className="demo-logo-vertical" /> */}
      <h1 className="title">HISTOLIGO</h1>
      <AntMenu
        selectedKeys={[currentPath]} // Set selectedKeys based on current path
        mode="inline"
        className='ant-layout-sider-children'
      >
        {items.map((item) => 
          item.children ? ( // Check if item has children to render as SubMenu
            <AntMenu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((child) => (
                <AntMenu.Item key={child.key} icon={child.icon}>
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

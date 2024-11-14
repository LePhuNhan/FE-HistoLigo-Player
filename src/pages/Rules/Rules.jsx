import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import '../Help/Help.styles.css';
import Menu from "../../components/Menu/Menu";


const Rules = () => {
  window.scrollTo(0, 0);
  const translations = {
    'en-US': {
      title: "RULES",
      home: "HOME"
    },
    'vi-VN': {
      title: "QUY TẮC",
      home: "TRANG CHỦ"
    },
  };
  const locale = localStorage.getItem('locale') || 'vi-VN';
  const lang = translations[locale] || translations['vi-VN'];
  const theme = localStorage.getItem("theme") === "true";
  useEffect(() => {
    const darkThemeLink = document.getElementById("dark-theme-style");

    if (theme) {
      // Nếu theme là dark và file CSS chưa được thêm thì thêm vào
      if (!darkThemeLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/DarkMode.css"; // Đảm bảo đường dẫn đúng
        link.id = "dark-theme-style";
        document.head.appendChild(link);
      }
    } else {
      // Nếu theme không phải là dark thì xóa file CSS dark mode
      if (darkThemeLink) {
        darkThemeLink.remove(); // Xóa hoàn toàn thẻ link
      }
    }
  }, [theme]);
  return (
    <div className="wrapHelp">
      <Menu />
      {/* <Link to="/learn">
        <h1 className="title">HISTOLIGO</h1>
      </Link> */}

      <div className="breadCrumb">
        <Link to="/learn">
          <span style={{ color: '#1cb0f6' }}>{lang.home}</span>
        </Link>
        <RightOutlined />
        <span>{lang.title}</span>
      </div>
    </div>
  );
};

export default Rules;

import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Rules = () => {
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
      <Link to="/chooseClass">
        <h1 className="title">HISTOLIGO</h1>
      </Link>

      <div className="breadCrumb">
        <span>TRANG CHỦ</span>
        <RightOutlined />
        <span>RULES</span>
      </div>
    </div>
  );
};

export default Rules;

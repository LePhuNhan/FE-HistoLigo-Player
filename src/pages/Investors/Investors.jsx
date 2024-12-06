import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Menu from "../../components/Menu/Menu";
import '../Help/Help.styles.css';
import './Investors.css';
const Investors = () => {
  window.scrollTo(0, 0);
  const theme = localStorage.getItem("theme") === "true";
  const translations = {
    'en-US': {
      title: "INVESTORS",
      home: "HOME"
    },
    'vi-VN': {
      title: "NHÀ ĐẦU TƯ",
      home: "TRANG CHỦ"
    },
  };
  const locale = localStorage.getItem('locale') || 'vi-VN';
  const lang = translations[locale] || translations['vi-VN'];

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

        <div style={{ display: 'flex', borderBottom: '2px solid rgb(225,225,225)', paddingBottom: '30px', width: '93%' }}>
          <div className="wrapInves">
            <h1>Histolingo <br />
              Investor <br />
              Relations
            </h1>
            <p>Our mission is to develop the best education in the world and make it universally available.</p>
            <p>Histolingo launched in 2012 and has since become the leading mobile learning platform globally. Our flagship app has organically become the world’s most popular way to learn languages and the top-grossing app in the Education category on both Google Play and the Apple App Store.</p>
            <p>Our global team works together to make learning fun, free, and effective for anyone who wants to learn, wherever they are.</p>
          </div>
          <div className="imgInves" style={{ marginTop: '50px', marginLeft: '30px' }}>
            <img width='500px' src="https://www.enkel.ca/wp-content/uploads/2017/06/How-to-be-investor-ready.png" alt="pic" />
          </div>
        </div>

        <div className="wrapResult">
          <h1>
            Press releases
          </h1>

          <ul>
            <li>
              <span className="titleDate">Nov 06, 2024</span>
              <p className="titleParam">
                Histolingo Achieves 54% DAU growth and 40% Revenue Growth in Third Quarter 2024
              </p>
            </li>
            <li>
              <span className="titleDate">Nov 06, 2024</span>
              <p className="titleParam">
                Histolingo Achieves 54% DAU growth and 40% Revenue Growth in Third Quarter 2024
              </p>
            </li>
            <li>
              <span className="titleDate">Nov 06, 2024</span>
              <p className="titleParam">
                Histolingo Achieves 54% DAU growth and 40% Revenue Growth in Third Quarter 2024
              </p>
            </li>
          </ul>

          <button>View on press releases</button>
        </div>

        <div className="wrapResult">
          <h1>
            Events & presentations
          </h1>

          <ul>
            <li>
              <span className="titleDate">Nov 06, 2024 • 5:30 PM EST</span>
              <p className="titleParam">
                Histolingo Third Quarter 2024 Earnings Call
              </p>
            </li>
            <li>
              <span className="titleDate">Aug 07, 2024 • 5:30 PM EDT</span>
              <p className="titleParam">
                Histolingo Second Quarter 2024 Earnings Call
              </p>
            </li>
            <li>
              <span className="titleDate">May 08, 2024 • 5:30 PM EDT</span>
              <p className="titleParam">
                Histolingo First Quarter 2024 Earnings Call
              </p>
            </li>
          </ul>

          <button>View All Events & Presentations</button>
        </div>

      </div>
    </div>
  );
};

export default Investors;

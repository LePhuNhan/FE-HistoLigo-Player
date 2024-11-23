import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import '../Help/Help.styles.css';
import Menu from "../../components/Menu/Menu";
import './Job.css'
const Job = () => {
  const theme = localStorage.getItem("theme") === "true";
  window.scrollTo(0, 0);
  const translations = {
    'en-US': {
      title: "JOB",
      home: "HOME"
    },
    'vi-VN': {
      title: "CÔNG VIỆC",
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

        <div className="titleJob">
          <h2 style={{ color: '#58cc02', fontWeight: '600' }}>Sứ mệnh của chúng tôi</h2>
          <h1 style={{ color: '#4c4c4c', fontWeight: '700', fontSize: "40px" }}>
            Phát triển nền giáo dục tốt nhất trên <br /> thế giới và phổ cập rộng rãi.
          </h1>
          <p style={{ color: '#777', marginTop: '30px' }}>
            Tham gia sứ mệnh thay đổi cuộc sống để kết nối mọi người lại với nhau.
          </p>
        </div>

        <div className="titleJob">
          <h1 style={{ color: '#4c4c4c', fontWeight: '700', fontSize: "40px" }}>
            Chỉ có tại Histolingo
          </h1>
          <p style={{ color: '#777', marginTop: '30px' }}>
            Chúng tôi là những người tốt bụng, sáng tạo và muốn tạo ra tác động tích cực đến thế giới.
          </p>

          <div className="wrapJobContent">
            <h3>Trên blog</h3>
            <ul style={{ display: 'flex' }}>
              <li>
                <img src='https://careers.Histolingo.com/d342dfa9ae2a085c89d2.png' alt="" />
                <p>Lưu ý từ CEO của chúng tôi: Tại sao Histolingo vẫn sẽ hướng đến sứ mệnh</p>
              </li>
              <li>
                <img src='https://careers.Histolingo.com/3ff0f1efe47f70ae1067.png' alt="" />
                <p>12 nguyên tắc hoạt động hình thành nên văn hóa đổi mới của chúng tôi</p>
              </li>
              <li>
                <img src='https://careers.Histolingo.com/fb0bdb8ea280b26b079b.png' alt="" />
                <p>Tại sao sự gắn bó lại quan trọng ở Histolingo</p>
              </li>
            </ul>
          </div>


        </div>

        <div className="titleJob">
          <h1 style={{ color: '#4c4c4c', fontWeight: '700', fontSize: "40px" }}>
            Việc làm đang tuyển dụng
          </h1>
          <div className="wrapJobContent">
            <h3 style={{ color: '#4b4b4b', marginBottom: '40px' }}>Việc làm nổi bật
            </h3>
            <ul>
              <li style={{ paddingBottom: '15px', marginBottom: '20px', borderBottom: "1px solid rgb(225,225,225)" }}>
                <h4>Giám đốc Marketing, Histolingo English Test</h4>
                <span>Pittsburgh, PA</span>
              </li>
              <li style={{ paddingBottom: '15px', marginBottom: '20px', borderBottom: "1px solid rgb(225,225,225)" }}>
                <h4>Giám đốc Kỹ thuật phần mềm, Histolingo English Test</h4>
                <span>Pittsburgh, PA</span>
              </li>
              <li style={{ paddingBottom: '15px', marginBottom: '20px', borderBottom: "1px solid rgb(225,225,225)" }}>
                <h4>Trưởng nhóm quản lý sản phẩm, thông báo</h4>
                <span>New York, New York
                </span>
              </li>
            </ul>
          </div>
        </div>


      </div>


    </div>
  );
};

export default Job;

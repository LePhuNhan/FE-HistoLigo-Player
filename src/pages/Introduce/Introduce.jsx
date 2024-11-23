import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Menu from "../../components/Menu/Menu";
import '../Help/Help.styles.css';
import './Introduce.css';
const Introduce = () => {
  window.scrollTo(0, 0);
  const translations = {
    'en-US': {
      title: "INTRODUCE",
      home: "HOME"
    },
    'vi-VN': {
      title: "GIỚI THIỆU",
      home: "TRANG CHỦ"
    },
  };
  const theme = localStorage.getItem("theme") === "true";
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
      <div className="breadCrumb">
        <Link to="/learn">
          <span style={{ color: '#1cb0f6' }}>{lang.home}</span>
        </Link>
        <RightOutlined />
        <span>{lang.title}</span>

        <ul className="wrapListItem">
          <li>Sứ mệnh</li>
          <li>Phương pháp</li>
          <li>Nhóm</li>
          <li>Công việc</li>
          <li>Nghiên cứu</li>
          <li>Liên hệ với chúng tôi</li>
        </ul>

        <div className="boxContents">
          <img src="https://d35aaqx5ub95lt.cloudfront.net/images/about/35f08319ad14fe2659618def38749488.svg" alt="pic" />
          <div className="wrapContent">
            <h2>Cá nhân hoá giáo dục</h2>
            <p>Mỗi người đều có phương pháp học riêng. Lần đầu tiên trong lịch sử giáo dục, chúng tôi có thể phân tích từ cách thức học tập của hàng triệu người để tạo ra một hệ thống giáo dục hiệu quả, thích hợp nhất dành riêng cho từng học viên
              <br />Mục tiêu lớn nhất của chúng tôi là làm cho người học trải nghiệm Histolingo như đang học với gia sư riêng.</p>
          </div>
        </div>

        <div className="boxContents">
          <div className="wrapContent">
            <h2>Làm cho việc học vui hơn.
            </h2>
            <p>Học ngoại ngữ trực tuyến thường nhàm chán, nên chúng tôi tạo ra một ứng dụng thú vị là Histolingo để giúp mọi người có động lực vừa chơi vừa học thêm kỹ năng mới mỗi ngày.
            </p>
          </div>
          <img src="https://d35aaqx5ub95lt.cloudfront.net/images/about/fbe2f592431cda4db31aeea6e7455279.svg" alt="pic" />
        </div>

        <div style={{ display: 'block' }} className="boxContents">
          <div className="wrapContent">
            <h2>Có thể tiếp cận từ khắp mọi nơi.
            </h2>
            <p>Có hơn 1.2 tỷ người đang học ngoại ngữ và phần lớn đang học vì muốn tiếp cận với nhiều cơ hội học tập hoặc làm việc tốt hơn. Đáng tiếc là quá trình dạy và học ngoại ngữ thường khá đắt đỏ, làm cho nhiều người không thể tiếp cận được.
              <br />
              Chúng tôi tạo ra Histolingo để tất cả mọi người đều có thể được học ngoại ngữ miễn phí - hoàn toàn không có chi phí ẩn hoặc nội dung phải trả tiền.
              <br />
              Histolingo được sử dụng phổ biến, từ người giàu nhất thế giới, các diễn viên Hollywood đến những em học sinh tại trường công ở các nước đang phát triển. Chúng tôi tin vào quyền bình đẳng, mọi người đều xứng đáng có được một nền giáo dục chất lượng cao dù họ giàu hay nghèo.


            </p>
          </div>
          <div className="wrapPicture">
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/about/46487434e6fc56229058978af5b13992.svg" alt="pic" />
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/about/fa27866cfc75a55f3a545e14770c8585.svg" alt="pic" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Introduce;

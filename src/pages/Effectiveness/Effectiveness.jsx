import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import '../Help/Help.styles.css';
import Menu from "../../components/Menu/Menu";
import './Effectiveness.css';
import Graph from '../../assets/graph.webp'
const Effectiveness = () => {
  window.scrollTo(0, 0);
  const theme = localStorage.getItem("theme") === "true";
  const translations = {
    'en-US': {
      title: "EFFECTIVENESS",
      home: "HOME"
    },
    'vi-VN': {
      title: "HIỆU QUẢ",
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

        <div className="wrapEffe">
          <div className="effeSide1">
            <h1> Histolingo thực <br /> sự hiệu quả</h1>
            <p>Khám phá cách tiếp cận dựa trên căn cứ khoa học của Histolingo mang tới hiệu quả rõ ràng. Tìm hiểu phương pháp giảng dạy, bằng chứng hiệu quả, lời khuyên từ chuyên gia và các cơ hội hỗ trợ nghiên cứu của chúng tôi!</p>
            <span>Các kết quả hàng đầu:</span>
            <ul className='listEff'>
              <li>
                <img src="https://d35aaqx5ub95lt.cloudfront.net/images/efficacyPage/8fde61bc0bf22fad1d25bc6570e28f11.svg" alt='pic' />
                <h4>
                  9 trong số 10 học viên cảm thấy tự tin hơn khi giao tiếp sau 1 tháng sử dụng Histolingo!
                </h4>
              </li>

              <li>
                <img src="https://d35aaqx5ub95lt.cloudfront.net/images/efficacyPage/8fde61bc0bf22fad1d25bc6570e28f11.svg" alt='pic' />
                <h4>
                  9 trên 10 giáo viên nói rằng Histolingo là một cách học ngôn ngữ hiệu quả
                </h4>
              </li>

              <li>
                <img src="https://d35aaqx5ub95lt.cloudfront.net/images/efficacyPage/8fde61bc0bf22fad1d25bc6570e28f11.svg" alt='pic' />
                <h4>
                  Sau 4 tuần sử dụng Histolingo, 8 trên 10 người học mới cảm thấy có động lực hơn khi học ngôn ngữ
                </h4>
              </li>

            </ul>
          </div>
          <div className='effeSide2'>
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/efficacyPage/8d395df96e127201d63aeef26a836ee3.svg" alt="pic" />
          </div>


        </div>

        <div className="effecSide3">
          <h1>
            Học tập ở cấp độ tương đương đại học
          </h1>
          <p>
            Các nghiên cứu cho thấy bạn có thể học được lượng kiến thức tương đương 5 kỳ học <br /> bậc đại học chỉ sau 5 phần học trong Histolingo. Tìm hiểu thêm về nghiên cứu này!
          </p>
          <img width='600px' height='300px' src={Graph} alt="pic" />
        </div>

        <div className="effecSide4">
          <h1>
            Chia sẻ từ người học Histolingo
          </h1>
          <p>
            Hãy lắng nghe chia sẻ từ những người học thật đã sử dụng Histolingo để đạt mục tiêu ngôn ngữ
          </p>

          <div className="wrapVideo">
            <div className="videoItem">
              <iframe width="500" height="280" style={{ display: 'block', borderRadius: '12px' }} src="https://www.youtube.com/embed/142vPnDQ6mM" title="BÍ KÍP HỌC GIỎI LỊCH SỬ CỦA THÍ SINH OLYMPIA | ĐƯỜNG LÊN ĐỈNH OLYMPIA - VTV3" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen></iframe>
              <span>BÍ KÍP HỌC GIỎI LỊCH SỬ CỦA THÍ SINH OLYMPIA</span>
            </div>
            <div className="videoItem">
              <iframe width="500" height="280" style={{ display: 'block', borderRadius: '12px' }} src="https://www.youtube.com/embed/41MgBDC0HOk" title="Cách học để đạt điểm tuyệt đối môn Lịch Sử//học ít nhớ nhiều và lâu//giveaway" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen></iframe>
              <span style={{ textTransform: 'uppercase' }}>Cách học để đạt điểm tuyệt đối môn Lịch Sử</span>
            </div>

            <div className="videoItem">
              <iframe width="500" height="280" style={{ display: 'block', borderRadius: '12px' }} src="https://www.youtube.com/embed/IzApT9t87iU" title="KIẾN THỨC CHỐNG LIỆT MÔN LỊCH SỬ 12 (Phần lịch sử Việt Nam)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen></iframe>
              <span style={{ textTransform: 'uppercase' }}>KIẾN THỨC CHỐNG LIỆT MÔN LỊCH SỬ 12 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Effectiveness;

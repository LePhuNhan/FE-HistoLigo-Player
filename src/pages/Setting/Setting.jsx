import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../components/Menu/Menu";
import "./Setting.styles.css";

// Định nghĩa đối tượng translations
const translations = {
  'en-US': {
    setting: "Setting",
    language: "Language",
    changeLanguage: "Change Language",
    interface: "Interface",
    darkMode: "Dark Mode",
    enable: "Enable",
    disable: "Disable",
  },
  'vi-VN': {
    setting: "Cài Đặt",
    language: "Ngôn Ngữ",
    changeLanguage: "Đổi Ngôn Ngữ",
    interface: "Giao Diện",
    darkMode: "Chế Độ Tối",
    enable: "Bật",
    disable: "Tắt",
  },
  // ... các ngôn ngữ khác nếu cần
};

const Setting = () => {
  const [language, setLanguage] = useState();
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const locale = localStorage.getItem('locale') || 'en-US';
  const lang = translations[locale] || translations['en-US'];

  // Danh sách ngôn ngữ
  const languageOptions = [
    { label: "Tiếng Việt", value: "vi-VN" },
    { label: "English", value: "en-US" },
    // Thêm các ngôn ngữ khác ở đây
    // { label: "Ngôn Ngữ Khác", value: "mã-ngôn-ngữ" },
  ];

  const fetchLanguages = async () => {
    try {
      const response = await axios.get(`${DomainApi}/language`);
      setLanguage(response.data);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem('locale', selectedLanguage); // Cập nhật locale trong localStorage
    window.location.reload(); // Làm mới trang để áp dụng ngôn ngữ mới
  };

  return (
    <div className="wrapSettings">
      <Menu />
      <div className="boxSettings">
        <h2 className="settingTitle">{lang.setting}</h2>
        <div className="wrapFun">
          <h3 className="titleFun">{lang.language}</h3>
          <h4 className="smTitle">{lang.changeLanguage}</h4>
          <select className="optionLang" onChange={handleLanguageChange} value={locale}>
            {languageOptions.map((item, index) => {
              return <option key={index} value={item.value}>{item.label}</option>;  
            })}
          </select>
        </div>

        <div className="wrapFun">
          <h3 className="titleFun">{lang.interface}</h3>
          <h4 className="smTitle">{lang.darkMode}</h4>
          <select className="optionLang">
            <option>{lang.enable}</option>
            <option>{lang.disable}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Setting;

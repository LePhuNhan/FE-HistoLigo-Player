import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../components/Menu/Menu";
import "./Setting.styles.css";

const Setting = () => {
  const [language, setLanguage] = useState();
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
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

  return (
    <div className="wrapSettings">
      <Menu />
      <div className="boxSettings">
        <h2 className="settingTitle">Cài đặt riêng</h2>
        <div className="wrapFun">
          <h3 className="titleFun">Ngôn ngữ</h3>
          <h4 className="smTitle">Đổi ngôn ngữ</h4>
          <select className="optionLang">
            {language !== undefined &&
              language.map((item, index) => {
                return <option key={index}>{item.label}</option>;
              })}
          </select>
        </div>

        <div className="wrapFun">
          <h3 className="titleFun">Giao diện</h3>
          <h4 className="smTitle">Chế độ tối</h4>
          <select className="optionLang">
            <option>Bật</option>;<option>Tắt</option>;
          </select>
        </div>
      </div>
    </div>
  );
};

export default Setting;

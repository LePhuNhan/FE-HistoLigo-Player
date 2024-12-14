import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Menu from "../../components/Menu/Menu";
import "./Setting.styles.css";
import { DarkModeContext } from "../../DarkModeContext";
import { LockOutlined, RollbackOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { FaAppleAlt } from "react-icons/fa";

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
    changePassword: "Change Password",
    passwordCurrent: "Password Current",
    newPassword: "New Password",
    repeatNewPassword: "Repeat New Password",
    saveNewPassword: "Save New Password",
    notMatchNewPassword: "Confirmation password does not match!",
  },
  'vi-VN': {
    setting: "Cài Đặt",
    language: "Ngôn Ngữ",
    changeLanguage: "Đổi Ngôn Ngữ",
    interface: "Giao Diện",
    darkMode: "Chế Độ Tối",
    enable: "Bật",
    disable: "Tắt",
    changePassword: "Đổi Mật Khẩu",
    passwordCurrent: "Mật Khẩu Hiện Tại",
    newPassword: "Mật Khẩu Mới",
    repeatNewPassword: "Lặp Lại Mật Khẩu Mới",
    saveNewPassword: "Lưu Mật Khẩu Mới",
    notMatchNewPassword: "Mật khẩu xác nhận không khớp!",
  },
  // ... các ngôn ngữ khác nếu cần
};

const Setting = () => {
  const theme = localStorage.getItem('theme') === 'true';
  const [themeRender, seThemeRender] = useState(theme)
  const context = useContext(DarkModeContext);
  const [language, setLanguage] = useState();
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const locale = localStorage.getItem('locale') || 'vi-VN';
  const lang = translations[locale] || translations['vi-VN'];

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  // Thêm validation function
  const isValidPasswordChange = () => {
    return oldPassword?.trim() && 
           newPassword?.trim() && 
           confirmPassword?.trim() && 
           newPassword === confirmPassword;
  };

  useEffect(() => {
    seThemeRender(theme);

  }, []);

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
    const flag = localStorage.getItem("flag") === "true";
    const selectedLanguage = event.target.value;
    localStorage.setItem("flag", !flag);
    localStorage.setItem('locale', selectedLanguage); // Cập nhật locale trong localStorage
    window.location.reload(); // Làm mới trang để áp dụng ngôn ngữ mới
  };

  const handleSaveNewPassword = async (oldPassword, newPassword, confirmPassword) => {
    try {
      // Thêm validation trước khi gửi request
      if (!oldPassword?.trim()) {
        alert(locale === "en-US" ? "Current password is required!" : "Vui lòng nhập mật khẩu hiện tại!");
        return;
      }

      if (!newPassword?.trim()) {
        alert(locale === "en-US" ? "New password is required!" : "Vui lòng nhập mật khẩu mới!");
        return;
      }

      if (!confirmPassword?.trim()) {
        alert(locale === "en-US" ? "Please confirm new password!" : "Vui lòng xác nhận mật khẩu mới!");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert(locale === "en-US" ? "New password and confirm password do not match!" : "Mật khẩu mới và xác nhận mật khẩu không khớp!");
        return;
      }

      // Gửi yêu cầu API
      const response = await axios.put(
        `${DomainApi}/change-password`,
        {
          oldPassword,
          newPassword,
          confirmNewPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Xử lý phản hồi
      if (response.status === 200) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        alert(locale === "en-US" ? "Password has been changed successfully" : "Mật khẩu đã được thay đổi thành công");
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.message === "Mật khẩu cũ không đúng!") {
            alert(locale === "en-US" ? "Old password incorrect!" : "Mật khẩu cũ không đúng!")
            window.location.reload();
          }
          else if (error.response.data.message === "Mật khẩu mới và xác nhận mật khẩu không khớp!") {
            alert(locale === "en-US" ? "New password and confirm password do not match!" : "Mật khẩu mới và xác nhận mật khẩu không khớp!")
            window.location.reload();
          }
        }
      }
    }
  }


  return (
    <div className="wrapSettings">
      <div style={{ borderColor: theme ? '' : 'rgb(229,229,229)' }} className='backLearn'><Link to='/learn'><RollbackOutlined /></Link></div>
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
          <select onChange={() => { context.toggleTheme(); }} className="optionLang">
            <option >{themeRender ? lang.enable : lang.disable}</option>
            <option >{themeRender ? lang.disable : lang.enable}</option>
          </select>
        </div>

        <div className="wrapFun changePassword">
          <h3 className="titleFun">{lang.changePassword}</h3>
          <h4 className="smTitle">{lang.passwordCurrent}</h4>

          <Input.Password onChange={(e) => setOldPassword(e.target.value)} className="changePassword" />

          <h4 className="smTitle">{lang.newPassword}</h4>
          <Input.Password onChange={(e) => setNewPassword(e.target.value)} className="changePassword" />

          <h4 className="smTitle">{lang.repeatNewPassword}</h4>
          <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} className="changePassword" />
          {newPassword && confirmPassword && newPassword !== confirmPassword && (
            <p className="importantWarning" style={{ color: "red !important", marginTop: "15px", textTransform: "capitalize" }}>
              {lang.notMatchNewPassword}
            </p>
          )}


          <button 
            onClick={() => handleSaveNewPassword(oldPassword, newPassword, confirmPassword)} 
            disabled={!isValidPasswordChange()}
            className={isValidPasswordChange() ? "btnChangePassword active" : "btnChangePassword"}
          >
            {lang.saveNewPassword}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Setting;

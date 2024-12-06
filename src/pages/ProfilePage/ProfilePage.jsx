import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Upload,
  Avatar,
  Row,
  Col,
  Layout,
  message,
} from "antd";
import Menu from "../../components/Menu/Menu";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import styles from "./ProfilePage.styles.css";
import imageCompression from 'browser-image-compression';
import debounce from "lodash.debounce";
import { Spin } from 'antd';

const { Option } = Select;

const ProfilePage = () => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarURL, setAvatarURL] = useState("");
  const [form] = Form.useForm();
  const debouncedHandleUpdateProfile = debounce(() => {
    handleUpdateProfile();
  }, 500);

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const localeToLabel = {
    "vi-VN": "vietNam",
    "en-US": "english",
    "ru-RU": "pусский",
  };
  const labelToLocale = {
    "vietNam": "vi-VN",
    "english": "en-US",
    "pусский": "ru-RU",
  };

  const getLocaleFromLabel = (label) => {
    return labelToLocale[label] || "";
  };

  const getLanguageLabel = (locale) => {
    return localeToLabel[locale] || "";
  };

  const translations = {
    'en-US': {
      updateProfile: "Update Profile",
      fullName: "Full name",
      sex: "Sex",
      language: "Language",
      email: "Email",
      phoneNumber: "Phone number",
      birthDay: "Birth day",
      selectSex: "Select your sex",
      selectLanguage: "Select your language",
      enterFullName: "Please enter your full name",
      enterEmail: "Please enter your email",
      enterPhoneNumber: "Please enter your phone number",
      selectBirthDate: "Select your birth date",
      updateProfileButton: "Update Profile",
      resetButton: "Reset",
      profileUpdated: "Profile updated successfully!",
      profileUpdateFailed: "Profile updated failed!",
      avatar: "Your Profile Picture",
      editAvatar: "Edit Avatar:",
      enterImageURL: "Enter image URL",
      male: "Male",
      female: "Female",
      other: "Other",
      english: "English",
      vietNam: "VietNam",
      spanish: "Spanish",
      french: "French",
      german: "German",
      chinese: "Chinese",
    },
    'vi-VN': {
      updateProfile: "Cập Nhật Hồ Sơ",
      fullName: "Họ và Tên",
      sex: "Giới Tính",
      language: "Ngôn Ngữ",
      email: "Email",
      phoneNumber: "Số Điện Thoại",
      birthDay: "Ngày Sinh",
      selectSex: "Chọn giới tính của bạn",
      selectLanguage: "Chọn ngôn ngữ của bạn",
      enterFullName: "Vui lòng nhập họ và tên của bạn",
      enterEmail: "Vui lòng nhập email của bạn",
      enterPhoneNumber: "Vui lòng nhập số điện thoại của bạn",
      selectBirthDate: "Chọn ngày sinh của bạn",
      updateProfileButton: "Cập Nhật Hồ Sơ",
      resetButton: "Đặt Lại",
      profileUpdated: "Cập nhật hồ sơ thành công!",
      profileUpdateFailed: "Cập nhật hồ sơ thất bại!",
      avatar: "Ảnh Đại Diện",
      editAvatar: "Chỉnh Sửa Ảnh Đại Diện:",
      enterImageURL: "Nhập URL hình ảnh",
      male: "Nam",
      female: "Nữ",
      other: "Khác",
      english: "Tiếng Anh",
      vietNam: "Tiếng Việt",
      spanish: "Tiếng Tây Ban Nha",
      french: "Tiếng Pháp",
      german: "Tiếng Đức",
      chinese: "Tiếng Trung",
    },
    'ru-RU': {
      updateProfile: "Обновить Профиль",
      fullName: "Полное имя",
      sex: "Пол",
      language: "Язык",
      email: "Электронная почта",
      phoneNumber: "Номер телефона",
      birthDay: "Дата рождения",
      selectSex: "Выберите ваш пол",
      selectLanguage: "Выберите ваш язык",
      enterFullName: "Пожалуйста, введите ваше полное имя",
      enterEmail: "Пожалуйста, введите вашу электронную почту",
      enterPhoneNumber: "Пожалуйста, введите ваш номер телефона",
      selectBirthDate: "Выберите вашу дату рождения",
      updateProfileButton: "Обновить Профиль",
      resetButton: "Сбросить",
      profileUpdated: "Профиль успешно обновлен!",
      profileUpdateFailed: "Не удалось обновить профиль!",
      avatar: "Ваше Изображение Профиля",
      editAvatar: "Редактировать Изображение:",
      enterImageURL: "Введите URL изображения",
      male: "Мужчина",
      female: "Женщина",
      other: "Другой",
      english: "Английский",
      vietNam: "Вьетнамский",
      spanish: "Испанский",
      french: "Французский",
      german: "Немецкий",
      chinese: "Китайский",
    },
  };

  const locale = localStorage.getItem('locale') || 'vi-VN'; // Mặc định là 'vi-VN' nếu không có giá trị

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const response = await axios.get(`${DomainApi}/player`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = response.data;
          form.setFieldsValue({
            fullName: data.fullname,
            username: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            sex: data.sex === 1 ? "male" : data.sex === 0 ? "female" : "other",
            language: getLanguageLabel(data.locale),
            birthDay: data.dateOfBirth ? dayjs(data.dateOfBirth) : null,
          });

          setAvatar(data.avatar);
          setAvatarURL(data.avatar);
        } catch (error) {
          console.error("Failed to fetch player data:", error);
          if (error.response && error.response.status === 401) {
            // Token hết hạn
            try {
              const refreshResponse = await axios.post(
                `${DomainApi}/user/refresh-token`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`,
                  },
                }
              );
              const newAccessToken = refreshResponse.data.data.accessToken;

              // Lưu token mới vào localStorage
              localStorage.setItem("accessToken", newAccessToken);
              window.alert("Phiên của bạn đã hết hạn. Vui lòng tải lại trang để tiếp tục.");
              // Reload trang để token mới hoạt động
              window.location.reload();
            } catch (refreshError) {
              console.error("Làm mới token thất bại:", refreshError);
            }
          } else {
            console.error("Error fetching player process data:", error);
          }
        }
        finally {
          setLoading(false); // Dừng loading sau khi fetch xong
        }
      } else {
        form.resetFields();
        setAvatar(null);
        setAvatarURL("");
      }

    };

    fetchData();
  }, [form, accessToken]);

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success(translations[locale].profileUpdated, 1); // Sử dụng chuỗi từ translations
  };

  const onFinishFailed = (errorInfo) => {
    message.error(translations[locale].profileUpdateFailed, 1); // Sử dụng chuỗi từ translations
    console.log("Failed:", errorInfo);
  };

  const handleAvatarChange = async (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
        };
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onload = () => {
          setAvatar(reader.result);
          setAvatarURL("");
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Failed to compress image:", error);
      }
    }
  };

  const handleURLChange = (e) => {
    const url = e.target.value;
    setAvatarURL(url);
    setAvatar(url);
  };

  const handleReset = () => {
    form.resetFields();
    setAvatar(null);
    setAvatarURL("");
  };

  const handleUpdateProfile = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const updateData = {
        fullname: values.fullName,
        dateOfBirth: values.birthDay ? values.birthDay.format("YYYY-MM-DD") : null,
        sex: values.sex === "male" ? 1 : (values.sex === "female" ? 0 : 2),
        email: values.email,
        phoneNumber: values.phoneNumber,
        userName: values.username,
        avatar: avatar,
        locale: getLocaleFromLabel(values.language),
      };

      const response = await axios.put(
        `${DomainApi}/player`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Success:", response.data);
      onFinish(response.data);

    } catch (error) {
      console.error("Failed to update player data:", error);
      onFinishFailed(error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Menu />
      <Layout className={"container"}>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "800",
            marginTop: "50px",
            fontSize: "40px",
          }}
        >
          {translations[locale].updateProfile}
        </h1>
        <Form style={{ position: 'relative' }}
          form={form}
          name="profileUpdate"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {loading ? <Spin /> : null}
          <Form.Item name="avatar" label={translations[locale].avatar}>
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
              className={styles.customUpload}
              onChange={handleAvatarChange}
            >
              {avatar ? (
                <Avatar size={120} src={avatar} />
              ) : (
                <Avatar size={120} src='https://d35aaqx5ub95lt.cloudfront.net/images/05147135350f5234cbf147813eee4db8.svg' />
              )}
            </Upload>
            <Form.Item label={translations[locale].editAvatar}>
              <Input
                id="profileUpdate_avt"
                value={avatarURL}
                onChange={handleURLChange}
                placeholder={translations[locale].enterImageURL}
              />
            </Form.Item>
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={translations[locale].fullName}
                name="fullName"
                rules={[{ required: true, message: translations[locale].enterFullName }]}
              >
                <Input
                  className={styles.inputOutlined}
                  placeholder={translations[locale].enterFullName}
                />
              </Form.Item>
              <Form.Item
                label={translations[locale].sex}
                name="sex"
                rules={[{ required: false, message: translations[locale].selectSex }]}
              >
                <Select
                  className={styles.selectOutlined}
                  placeholder={translations[locale].selectSex}
                >
                  <Option value="male">{translations[locale].male}</Option>
                  <Option value="female">{translations[locale].female}</Option>
                  <Option value="other">{translations[locale].other}</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={translations[locale].language}
                name="language"
                rules={[{ required: true, message: translations[locale].selectLanguage }]}
              >
                <Select
                  className={styles.selectOutlined}
                  placeholder={translations[locale].selectLanguage}
                >
                  <Option value="english">{translations[locale].english}</Option>
                  <Option value="vietNam">{translations[locale].vietNam}</Option>
                  <Option value="spanish">{translations[locale].spanish}</Option>
                  <Option value="french">{translations[locale].french}</Option>
                  <Option value="german">{translations[locale].german}</Option>
                  <Option value="chinese">{translations[locale].chinese}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={translations[locale].email}
                name="email"
                rules={[{ required: true, message: translations[locale].enterEmail, type: "email" }]}
              >
                <Input
                  className={styles.inputOutlined}
                  placeholder={translations[locale].enterEmail}
                />
              </Form.Item>
              <Form.Item
                label={translations[locale].phoneNumber}
                name="phoneNumber"
                rules={[{ required: true, message: translations[locale].enterPhoneNumber }]}
              >
                <Input
                  className={styles.inputOutlined}
                  placeholder={translations[locale].enterPhoneNumber}
                />
              </Form.Item>
              <Form.Item
                label={translations[locale].birthDay}
                name="birthDay"
                rules={[{ required: false, message: translations[locale].selectBirthDate }]}
              >
                <DatePicker
                  className={styles.pickerOutlined}
                  style={{ width: "100%" }}
                  placeholder={translations[locale].selectBirthDate}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="button"
              style={{ background: "#D74632" }}
              onClick={debouncedHandleUpdateProfile}
            >
              {translations[locale].updateProfileButton}
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              htmlType="button"
              onClick={handleReset}
            >
              {translations[locale].resetButton}
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;

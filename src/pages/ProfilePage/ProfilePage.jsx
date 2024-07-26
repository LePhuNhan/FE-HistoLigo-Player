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
import Menu from "../Menu/Menu";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import styles from "./ProfilePage.styles.css";
import { useParams, useNavigate } from "react-router-dom";

const { Option } = Select;

const ProfilePage = () => {
  const [avatar, setAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState(""); // State for URL input
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const localeToLabel = {
    "vi_VN": "vietNam",
    "en_US": "english",
    "ru_RU": "pусский",
  };
  const labelToLocale = {
    "vietNam": "vi_VN",
    "english": "en_US",
    "pусский": "ru_RU",
  };

  const getLocaleFromLabel = (label) => {
    return labelToLocale[label] || "unknown";
  };

  const getLanguageLabel = (locale) => {
    return localeToLabel[locale] || "Unknown";
  };

  useEffect(() => {
    const fetchData = async () => {
      
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8000/player/${id}`);
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
        }
      } else {
        form.resetFields();
        setAvatar(null);
        setAvatarURL("");
      }
    };

    fetchData();
  }, [id, form]);

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Profile updated successfully!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleAvatarChange = ({ file }) => {
    if (file && file.originFileObj) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        setAvatarURL(""); // Clear URL if an image file is selected
      };
      reader.readAsDataURL(file.originFileObj);
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
      const response = await axios.put(`http://localhost:8000/player/${id}`, updateData);
      console.log("Success:", response.data);
      onFinish(response.data);
      navigate(`/profile/${id}`);

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
          Update Profile
        </h1>
        <Form
          form={form}
          name="profileUpdate"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item name="avatar" label="Your Profile Picture">
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false} // Prevent automatic upload
              className={styles.customUpload}
              onChange={handleAvatarChange}
            >
              {avatar ? (
                <Avatar size={120} src={avatar} />
              ) : (
                <Avatar size={120} icon={<UserOutlined />} />
              )}
              
            </Upload>
            <Form.Item label="Edit Avatar:">
              <Input
                value={avatarURL}
                onChange={handleURLChange}
                placeholder="Enter image URL"
              />
            </Form.Item>
          </Form.Item>
          <Row gutter={16}>
            {/* Left side */}
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Full name"
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your full name!" },
                ]}
              >
                <Input
                  className={styles.inputOutlined}
                  placeholder="Please enter your full name"
                />
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input
                  className={styles.inputOutlined}
                  placeholder="Please enter your username"
                />
              </Form.Item>
              <Form.Item
                label="Sex"
                name="sex"
                rules={[
                  { required: false, message: "Please select your sex!" },
                ]}
              >
                <Select
                  className={styles.selectOutlined}
                  placeholder="Select your sex"
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Language"
                name="language"
                rules={[
                  { required: true, message: "Please select your language!" },
                ]}
              >
                <Select
                  className={styles.selectOutlined}
                  placeholder="Select your language"
                >
                  <Option value="english">English</Option>
                  <Option value="vietNam">VietNam</Option>
                  <Option value="spanish">Spanish</Option>
                  <Option value="french">French</Option>
                  <Option value="german">German</Option>
                  <Option value="chinese">Chinese</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Right side */}
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  className={styles.inputOutlined}
                  placeholder="Please enter your email"
                />
              </Form.Item>
              <Form.Item
                label="Phone number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                ]}
              >
                <Input
                  className={styles.inputOutlined}
                  placeholder="Please enter your phone number"
                />
              </Form.Item>
              <Form.Item
                label="Birth day"
                name="birthDay"
                rules={[
                  { required: false, message: "Please enter your birth date!" },
                ]}
              >
                <DatePicker
                  className={styles.pickerOutlined}
                  style={{ width: "100%" }}
                  placeholder="Select your birth date"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit and Reset Buttons */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="button"
              style={{ background: "#D74632" }}
              onClick={handleUpdateProfile}
            >
              Update Profile
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              htmlType="button"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;

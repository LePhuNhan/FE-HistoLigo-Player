import React from "react";
import "./ForgotP.styles.css";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const navigate = useNavigate();
  const onFinish = async (values) => {

    const postData = {
      userName: values.username,
      email: values.email,
    };


    try {
      const response = await axios.post(`${DomainApi}/user/forgot-password`, postData);
      navigate("/sendPasswordComplete"); // Điều hướng đến trang mới

    } catch (error) {
      console.error("Error posting data:", error);

    }


  };

  return (
    <div className="login forgotPassword">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1 className="login_heading">Forgot Password</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          className="inputEmail"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Email không hợp lệ!',
            }
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <p className="pWarning">*Để trống trường Email thì hệ thống tự động gửi qua Email đã có trong tài khoản</p>


        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;

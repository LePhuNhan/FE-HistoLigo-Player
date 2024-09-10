import React from "react";
import "./SignUpPage.styles.css";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input,message  } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { username, email, password, confirmPassword } = values;

    try {
      const response = await axios.post("http://localhost:8000/api/v1/users", {
        userName: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      
      if (response.data.message === "Tạo tài khoản thành công") {
        message.success("Sign up successful!");
        const responseLogin = await axios.post("http://localhost:8000/api/v1/login", {
          userName: username,
          password: password,
        });
        const { accessToken } = responseLogin.data.data;
        if (localStorage.getItem('accessToken')) {
          localStorage.removeItem('accessToken');
        }
        localStorage.setItem('accessToken', accessToken);
  
        navigate(`/learn`);
      } else {
        message.error("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      message.error("Sign up failed. Please try again.");
    }
  };
  
  return (
    <div className="signUp">
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        className="signUp-from"
        onFinish={onFinish}
      >
        <h1 className="signUp_heading">Sign up</h1>
        <Form.Item
          name="username"
          className="antFormItem"
          rules={[{ required: true,whitespace: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="email"
          className="antFormItem"
          rules={[{ required: true, whitespace: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          className="antFormItem"
          rules={[{ required: true, whitespace: true, message: "Please input your Password!" }]}
          hasFeedback
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          className="antFormItem"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, whitespace: true, message: "Please confirm your Password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          {/* <Link to="/learn"> */}
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Sign Up
            </Button>
          {/* </Link> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpPage;

import React from "react";
import "./LoginPage.styles.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/login", {
        userName: values.username,
        password: values.password,
      });
      const { accessToken } = response.data.data;
      if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken');
      }
      localStorage.setItem('accessToken', accessToken);

      navigate(`/learn`);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  //
  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1 className="login_heading">Login</h1>
        <Form.Item className="antFormItem"
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item className="antFormItem"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="antFormItem">
          <Form.Item className="antFormItem" name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" to="/forgotPassword">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item className="antFormItem">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
          <Link to="/signUp">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button login-signUp"
            >
              Sign Up
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;

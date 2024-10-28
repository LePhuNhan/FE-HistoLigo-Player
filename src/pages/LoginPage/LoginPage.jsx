import React from "react";
import "./LoginPage.styles.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import BtnGoogleLogin from "../../components/BtnGoogleLogin/GoogleLogin.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const DomainApi=process.env.REACT_APP_DOMAIN_API;
  const debouncedOnFinish = debounce((values) => {
    onFinish(values);
  }, 500);
  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${DomainApi}/user/login`, {
        userName: values.username,
        password: values.password,
      });
      const { accessToken } = response.data.data;
      if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken');
      }
      localStorage.setItem('accessToken', accessToken);
      message.success("Login success!",1);
      navigate(`/chooseClass`);
    } catch (error) {
      message.error("Login failed!",1);
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
        onFinish={debouncedOnFinish}
      >
        <h1 className="login_heading">Login</h1>
        <BtnGoogleLogin></BtnGoogleLogin>
        <Form.Item className="antFormItem"
          name="username"
          rules={[{ required: true, whitespace: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item className="antFormItem"
          name="password"
          rules={[{ required: true, whitespace: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
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

import React from "react";
import "./SignUpPage.styles.css";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BtnGoogleLogin from "../../components/BtnGoogleLogin/GoogleLogin.jsx";
const SignUpPage = () => {
  const navigate = useNavigate();
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const onFinish = async (values) => {
    const { username, email, password, confirmPassword } = values;

    try {
      const response = await axios.post(`${DomainApi}/user/register`, {
        userName: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      if (response.data.message === "Tạo tài khoản thành công") {
        message.success("Sign up successful!");
        const responseLogin = await axios.post(`${DomainApi}/user/login`, {
          userName: username,
          password: password,
        });
        const { accessToken } = responseLogin.data.data;
        if (localStorage.getItem('accessToken')) {
          localStorage.removeItem('accessToken');
        }
        localStorage.setItem('accessToken', accessToken);

        navigate(`/chooseClass`);
      } else {
        message.error("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      message.error("Sign up failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="signUp">

        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          className="signUp-from"
          onFinish={onFinish}
        >
          <h1 className="signUp_heading">Sign up</h1>
          <BtnGoogleLogin></BtnGoogleLogin>
          <Form.Item
            name="username"
            className="antFormItem"
            rules={[{ required: true, whitespace: true, message: "Please input your Username!" }]}
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
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
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
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />

          </Form.Item>

          <Form.Item>
            {/* <Link to="/learn"> */}
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Sign Up
              <div className="changeLogin">
                <Link to='/login'>Back to Login</Link>
              </div>
            </Button>


            <div style={{ width: '110%', marginLeft: '-10%' }} className="sepa">
              <p>OR</p>
            </div>

            {/* <button
              className="btnGoogle-signUp"
            >
              <img className="iconGoogle" src="https://thanhdanh27.github.io/Nest-Shopping/static/media/google.e12914ad8afda3f6f2e8.png" alt="google"/>
              Sign Up With Google
            </button> */}
            {/* </Link> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;

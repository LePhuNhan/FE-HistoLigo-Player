import React from "react";
import { Form, Input, Button, DatePicker, Select, Upload, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../components/ProfilePage.css"
const { Option } = Select;

const ProfilePage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ margin: "0 auto", paddingInline: "200px" }}>
      <h1 style={{ textAlign: "center", fontWeight: "800", marginTop: "50px", fontSize:"40px" }}>Update Profile</h1>
      <Form
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
              className="custom-upload"
            >
              <Avatar size={120} icon={<UserOutlined />} />
              <div style={{ marginTop: 80, marginLeft: 20 }}>Edit</div>
            </Upload>
        </Form.Item>
        <Row gutter={16}>
          {/* Left side */}
          <Col span={12}>
            <Form.Item
              label="Full name"
              name="fullName"
              rules={[{ required: true, message: "Please enter your full name!" }]}
            >
              <Input placeholder="Please enter your full name" />
            </Form.Item>
            
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter your username!" }]}
            >
              <Input placeholder="Please enter your username" />
            </Form.Item>
            <Form.Item
              label="Sex"
              name="sex"
              rules={[{ required: false, message: "Please select your sex!" }]}
            >
              <Select placeholder="Select your sex">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Language"
              name="language"
              rules={[{ required: true, message: "Please select your language!" }]}
            >
              <Select placeholder="Select your language">
                <Option value="english">English</Option>
                <Option value="spanish">Spanish</Option>
                <Option value="french">French</Option>
                <Option value="german">German</Option>
                <Option value="chinese">Chinese</Option>
              </Select>
            </Form.Item>
          </Col>
          
          {/* Right side */}
          <Col span={12}>
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
              <Input placeholder="Please enter your email" />
            </Form.Item>
            <Form.Item
              label="Phone number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
            >
              <Input placeholder="Please enter your phone number" />
            </Form.Item>
            <Form.Item
              label="Birth day"
              name="birthDay"
              rules={[{ required: false, message: "Please enter your birth date!" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select your birth date"
              />
            </Form.Item>
            
            
            
          </Col>
        </Row>
        
        {/* Submit and Reset Buttons */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{background:"#D74632"}}>
            Update Profile
          </Button>
          <Button style={{ marginLeft: 8 }} htmlType="button">
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;

import { Form } from "antd";
import SendEmailPng from '../../assets/sendEmailPng.png'
import "./ForgotP.styles.css";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
const SendPassword = () => {


    return (
        <div className="login forgotPassword">

            <Form
                name="normal_login"
                className="login-form"
            >

                <Link className="backToLogin" to="/login">
                    <ArrowLeftOutlined style={{ fontSize: '15px', marginRight: '5px' }} />

                    Back to Login</Link>
                <div style={{ textAlign: 'center' }}><img className="sendEmailImg" src={SendEmailPng} alt="img" /></div>
                <div className="wrapTitleSendEmail">
                    <p className="tks">Thank you!</p>
                    <p className="please">Please check your email.</p>
                </div>
            </Form>
        </div>
    );
};

export default SendPassword;

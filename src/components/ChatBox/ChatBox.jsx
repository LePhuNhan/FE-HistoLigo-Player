import { useState } from 'react';
import './ChatBox.css';
import { CloseOutlined, ExportOutlined } from '@ant-design/icons';
import axios from 'axios'; // Thêm axios để gọi API
import Robot from '../../assets/robot.png'

const ChatBox = () => {
    const [Open, IsOpen] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const DomainApi = process.env.REACT_APP_DOMAIN_API;
    const [message, setMessage] = useState(""); // State để lưu tin nhắn người dùng nhập
    const [messages, setMessages] = useState([]); // Lưu lịch sử tin nhắn
    const locale = localStorage.getItem("locale") || "vi-VN";

    // Lấy topicId từ localStorage
    const selectedTopicId = localStorage.getItem("selectedTopicId");

    const handleSend = async () => {
        if (!message.trim()) return; // Nếu input rỗng, không gửi

        try {
            const response = await axios.post(
                `${DomainApi}/aiChat/ask`,
                {
                    content: message,
                    topicId: selectedTopicId
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}` // Thêm token vào header
                    }
                }
            );

            const botReply = response.data.data.answer || "No response"; // Giả định API trả về phản hồi trong `reply`

            // Cập nhật danh sách tin nhắn
            setMessages([
                ...messages,
                { sender: "user", text: message },
                { sender: "bot", text: botReply }
            ]);

            setMessage(""); // Reset input sau khi gửi
        } catch (error) {
            console.error("Error sending message:", error);

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
            }
        }
    };
    // Hàm xử lý khi nhấn phím
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="wrapperChatBot">
            <div className="title">Histobot
                <span onClick={() => IsOpen(!Open)} className="close">
                    {Open ? <CloseOutlined /> : <ExportOutlined />}
                </span>
            </div>

            {Open ? (
                <>
                    <div style={{ height: '400px' }} className="box">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`item ${msg.sender === "bot" ? "" : "right"}`}
                            >
                                {msg.sender === "bot" && (
                                    <div className="icon">
                                        <img src={Robot} alt='robot' />
                                    </div>
                                )}
                                <div className="msg">
                                    <p style={{ wordBreak: 'break-word' }}>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="typing-area">
                        <div className="input-field">
                            <input
                                type="text"
                                placeholder={locale === 'vi-VN' ? 'Nhập tin nhắn của bạn' : 'Type your message'}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown} // Thêm sự kiện lắng nghe Enter
                                required
                            />
                            <button onClick={handleSend}>{locale === 'vi-VN' ? 'Gửi' : 'Send'}</button>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default ChatBox;

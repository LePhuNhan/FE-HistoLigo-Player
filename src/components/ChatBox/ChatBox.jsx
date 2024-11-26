import { useState } from 'react';
import './ChatBox.css'
import { CloseOutlined, ExportOutlined } from '@ant-design/icons';

const ChatBox = () => {

    const [Open, IsOpen] = useState(false);
    return (
        <div className="wrapper">
            <div className="title">Histobot
                <span onClick={() => {
                    IsOpen(!Open)
                }} className="close">{Open ? (<CloseOutlined />) : (<ExportOutlined />)}</span>
            </div>
            {Open ? (<>
                <div className="box">
                    <div className="item">
                        <div className="icon">
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="msg">
                            <p>Hello everyone, How are you?</p>
                        </div>
                    </div>

                    <br clear="both" />
                    <div className="item right">
                        <div className="msg">
                            <p>Nice</p>
                        </div>
                    </div>
                </div>

                <div className="typing-area">
                    <div className="input-field">
                        <input type="text" placeholder="Type your message" required />
                        <button>Send</button>
                    </div>
                </div>
            </>) : null}

        </div >
    )
}
export default ChatBox;
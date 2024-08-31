import React, { useEffect, useState } from "react";
import { Layout, Typography, Card, message, Button, Input } from "antd";
import { ThunderboltOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResultPage.style.css";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const Result = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const topicId = localStorage.getItem("selectedTopicId");
  const playerTestId = localStorage.getItem("playerTestId");
  const navigate = useNavigate();
  const DomainApi = process.env.REACT_APP_DOMAIN_API;

  useEffect(() => {
    const fetchTestData = async () => {
      if (!playerTestId) {
        message.error("Test Id not found. Redirecting...");
        return;
      }

      try {
        const response = await axios.get(
          `${DomainApi}/playerTest/${playerTestId}`
        );
        setScore(response.data.score);
        setTime(response.data.time);
      } catch (error) {
        message.error("Error fetching test data.");
      }
    };
    fetchTestData();
  }, [playerTestId]);

  const handleTopicClick = () => {
    navigate(`/learn/test/${topicId}`);
  };

  const handleFeedbackClick = () => {
    setShowFeedback(!showFeedback);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async () => {
    if (feedback.trim()) {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.post(
          `${DomainApi}/feedback`,
          {
            content: feedback,
            testId: playerTestId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        message.success("Feedback submitted!");
        setFeedback("");
        setShowFeedback(false);
      } catch (error) {
        message.error("Error submitting feedback.");
      }
    } else {
      message.error("Please enter your feedback.");
    }
  };

  return (
    <Layout style={{ background: "#fff" }}>
      <Header className="header" style={{ marginTop: "8%" }}>
        <Title level={2} className="header-title">
          Test Completed!
        </Title>
      </Header>
      <Content className="content">
        <div className="result-cards">
          <Card className="result-card" style={{ backgroundColor: "#FFD700" }}>
            <Title
              level={5}
              style={{
                color: "#fff",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Total Score:
            </Title>
            <ThunderboltOutlined
              style={{ fontSize: "2rem", color: "#fff", marginRight: "5px" }}
            />
            <Text strong style={{ fontSize: "2rem", color: "#fff" }}>
              {score}
            </Text>
          </Card>
          <Card className="result-card" style={{ backgroundColor: "#32CD32" }}>
            <Title
              level={5}
              style={{
                color: "#fff",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Time:
            </Title>
            <ClockCircleOutlined
              style={{ fontSize: "2rem", color: "#fff", marginRight: "5px" }}
            />
            <Text strong style={{ fontSize: "2rem", color: "#fff" }}>
              {time.toFixed(0)}s
            </Text>
          </Card>
        </div>
        {showFeedback && (
          <div className="feedback-container" style={{ marginTop: "20px" }}>
            <TextArea
              rows={4}
              value={feedback}
              onChange={handleFeedbackChange}
              style={{ minWidth: "600px" }}
              placeholder="Write your feedback here..."
            />
            <Button
              type="primary"
              onClick={handleFeedbackSubmit}
              className="button"
              style={{ margin: "10px 0 0 83%", display: "flex" }}
            >
              Submit
            </Button>
          </div>
        )}
      </Content>
      <div style={{ marginTop: "20px" }} className="btn">
        <Button type="primary" onClick={handleFeedbackClick} className="button">
          Feedback
        </Button>
        <Button
          type="primary"
          onClick={handleTopicClick}
          style={{ marginLeft: "10px" }}
          className="button"
        >
          Return
        </Button>
      </div>
    </Layout>
  );
};

export default Result;

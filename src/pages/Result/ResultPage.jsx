import React, { useEffect, useState } from "react";
import { Layout, Typography, Card, message, Button, Input } from "antd";
import { ThunderboltOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResultPage.style.css";
import debounce from "lodash.debounce";

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
  const selectedTestId = localStorage.getItem("selectedTestId");
  const navigate = useNavigate();
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const accessToken = localStorage.getItem("accessToken");

  const debouncedHandleUpdateProfile = debounce(() => {
    handleUpdateRank();
  }, 500);

  const handleUpdateRank = async () => {
    try {
      const updateData = {
       
      };
      const response = await axios.put(
        `${DomainApi}/player`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to update player data:", error);
    }
  };

  const fetchTestData = async () => {
    if (!playerTestId) {
      message.error("Test Id not found. Redirecting...",1);
      return;
    }

    try {
      const response = await axios.get(
        `${DomainApi}/playerTest/${playerTestId}`
      );
      const { score, time, testId } = response.data;
      setScore(score);
      setTime(time);

      await updatePlayerProcess(testId, score, time);
    } catch (error) {
      message.error("Error fetching test data.",1);
    }
  };
  const updatePlayerProcess = async (testId, score, time) => {
    try {
      const response = await axios.put(
        `${DomainApi}/playerProcess/combindedTopic`,
        {
          testId,
          score,
          time: `${time}s`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log({
        topics: [
          {
            topicId: topicId,
            tests: [
              {
                testId,
                score,
                time: `${time}s`,
              },
            ],
          },
        ],
      });
      console.log("Player process updated successfully!");
    } catch (error) {
      message.error("Error updating player process.",1);
    }
  };
  useEffect(() => {
    fetchTestData();
  }, []);

  const handleTopicClick = () => {
    navigate(`/learn/test/${topicId}`);
    
  };

  const handleSaveAndReturn = () =>{
    debouncedHandleUpdateProfile();
    handleTopicClick();
  }

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
            testId: selectedTestId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        message.success("Feedback submitted!",1);
        setFeedback("");
        setShowFeedback(false);
      } catch (error) {
        message.error("Error submitting feedback.",1);
      }
    } else {
      message.error("Please enter your feedback.",1);
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
              {score.toFixed(2)}
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
          onClick={handleSaveAndReturn}
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

import React, { useState, useEffect } from "react";
import {
  Card,
  Radio,
  Button,
  Input,
  Row,
  Col,
  Progress,
  Select,
  message,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./QuestionPage.style.css";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [testName, setTestName] = useState("");
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const locale = "en-US";
  const testId = localStorage.getItem("selectedTestId");

  const navigate = useNavigate();
  const { Option } = Select;

  useEffect(() => {
    const fetchTestData = async () => {
      if (!testId) {
        message.error("Test ID not found. Redirecting...");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/question/${testId}`
        );
        const { test, questions } = response.data;
        setTestName(test.localeData[locale]?.name || test.name);
        setQuestions(questions);
      } catch (error) {
        console.error("Error fetching test data:", error);
        message.error("Error fetching test data.");
      }
    };
    fetchTestData();
  }, [testId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const checkAnswer = (question) => {
    const currentAnswer = answers[question._id];
    let isCorrect = false;

    switch (question.questionType) {
      case 1: // True/False
        isCorrect = currentAnswer === question.answer;
        break;

      case 0: // Multiple Choice
        isCorrect = currentAnswer === question.answer;
        break;

      case 3: // Fill-in-the-Blank
        isCorrect = currentAnswer === question.answer[0];
        break;

      case 2: // Matching
        const currentAnswerArray = question.leftColumn.map((item, index) => ({
          leftColumn: item,
          rightColumn: answers[question._id]?.[index] || null,
        }));

        const correctAnswerArray = question.answer.map((item) => ({
          leftColumn: item.leftColumn,
          rightColumn: item.rightColumn,
        }));

        isCorrect =
          JSON.stringify(currentAnswerArray) ===
          JSON.stringify(correctAnswerArray);

        break;

      default:
        isCorrect = false;
        break;
    }

    setCorrect(isCorrect);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    }, 2000);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/submit", { answers });
      setIsQuizCompleted(true);
      message.success("Quiz completed! Redirecting to results page...");
      setTimeout(() => {
        navigate("/results"); // Adjust this path as necessary
      }, 2000);
    } catch (error) {
      console.error("Error submitting answers:", error);
      message.error("Error submitting answers. Please try again.");
    }
  };

  const renderQuestion = (question) => {
    const localizedQuestion = question.localeData[locale] || question;

    switch (question.questionType) {
      case 1: // True/False
  return (
    <div className="true-false-container">
      <Radio.Group
        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
        value={answers[question._id]}
        className="true-false-group"
        buttonStyle="solid"
      >
        <Radio.Button
          value={true}
          className={`true-false-option ${
            answers[question._id] === true ? "selected" : ""
          }`}
        >
          True
        </Radio.Button>
        <Radio.Button
          value={false}
          className={`true-false-option ${
            answers[question._id] === false ? "selected" : ""
          }`}
        >
          False
        </Radio.Button>
      </Radio.Group>
    </div>
  );

      case 0: // Multiple Choice
        return (
          <div className="multiple-choice-container">
            <Radio.Group
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              value={answers[question._id]}
              className="multiple-choice-group"
            >
              {localizedQuestion.options.map((option, index) => (
                <Radio.Button
                  key={index}
                  value={index}
                  className="multiple-choice-option"
                >
                  <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        );

      case 3: // Fill-in-the-Blank
        return (
          <Input
            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            value={answers[question._id]}
            placeholder="Enter your answer"
          />
        );
      case 2: // Matching
        return (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                {question.leftColumn.map((item, index) => (
                  <div key={index} style={{ marginBottom: "20px",marginTop: "5px" }}>
                    {item}
                  </div>
                ))}
              </Col>
              <Col span={12}>
                {question.leftColumn.map((_, index) => (
                  <Select
                    key={index}
                    placeholder="Select match"
                    onChange={(value) =>
                      handleAnswerChange(question._id, {
                        ...answers[question._id],
                        [index]: value,
                      })
                    }
                    value={answers[question._id]?.[index] || undefined}
                    style={{ width: "100%", marginBottom: "10px" }}
                  >
                    {question.rightColumn.map((rightItem) => (
                      <Option key={rightItem} value={rightItem}>
                        {rightItem}
                      </Option>
                    ))}
                  </Select>
                ))}
              </Col>
            </Row>
          </div>
        );
      default:
        return null;
    }
  };

  const isAnswerSelected = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      return false;
    }
    const currentQuestionId = currentQuestion._id;
    const answer = answers[currentQuestionId];
    return answer !== undefined && answer !== null && answer !== "";
  };

  return (
    <div>
      <div className="processbar">
        <Progress
          percent={((currentQuestionIndex + 1) / questions.length) * 100}
          showInfo={false}
          status="active"
          strokeWidth={15}
          strokeColor="#52c41a"
          style={{ marginBottom: 20 }}
        />
      </div>
      <div className="ask">
        <h2>{testName}</h2>
        {questions.length > 0 && (
          <Card
            title={`Question ${currentQuestionIndex + 1}`}
            className="questionCard"
          >
            <p>
              {questions[currentQuestionIndex].localeData[locale]?.ask ||
                questions[currentQuestionIndex].ask}
            </p>
            {renderQuestion(questions[currentQuestionIndex])}
          </Card>
        )}
        {showFeedback && (
          <div style={{ marginTop: "10px", color: correct ? "green" : "red" }}>
            {correct ? "Correct!" : "Incorrect!"}
          </div>
        )}
      </div>

      <div style={{ marginTop: "20px" }} className="btn">
        <Button
          type="primary"
          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
          disabled={currentQuestionIndex >= questions.length - 1}
          className="button"
        >
          Skip
        </Button>
        <Button
          type="primary"
          onClick={() => checkAnswer(questions[currentQuestionIndex])}
          disabled={!isAnswerSelected()}
          style={{ marginLeft: "10px" }}
          className="button"
        >
          Answer
        </Button>
      </div>
    </div>
  );
};

export default QuizPage;

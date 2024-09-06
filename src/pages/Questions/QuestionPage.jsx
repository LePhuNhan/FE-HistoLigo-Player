import React, { useState, useEffect, useRef } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import "./QuestionPage.style.css";
import debounce from "lodash.debounce";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [testName, setTestName] = useState("");
  const [answers, setAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const isInitialRender = useRef(true);
  const isInitialRender2 = useRef(true);
  const locale = "en-US";
  const { testId } = useParams();
  const [highlightedLeft, setHighlightedLeft] = useState(null);
  const [highlightedRight, setHighlightedRight] = useState(null);
  const [leftColors, setLeftColors] = useState([]);
  const [rightColors, setRightColors] = useState([]);
  const [previouslySelectedRight, setPreviouslySelectedRight] = useState(null);
  const playerTestId = localStorage.getItem("playerTestId");
  const [playerTest, setPlayerTest] = useState({});
  const [aggregatedResults, setAggregatedResults] = useState([]);
  const highlightColors = [
    "lightblue",
    "lightgreen",
    "lightcoral",
    "lightgoldenrodyellow",
  ];

  const debouncedCheckAnswer = debounce((question) => {
    checkAnswer(question);
  }, 500);

  const areRightColumnColorsDistinct = (colors) => {
    const distinctColors = new Set(colors);
    return distinctColors.size === 4;
  };
  const handleLeftClick = (index) => {
    const color = highlightColors[index % highlightColors.length];

    const newLeftColors = leftColors.map((currentColor, i) =>
      i === index ? color : currentColor
    );

    setLeftColors(newLeftColors);
    setHighlightedLeft(index);
    const currentQuestion = questions[currentQuestionIndex];
    if (highlightedRight !== null && currentQuestion) {
      const updatedAnswer = {
        leftColumn: currentQuestion.leftColumn[index],
        rightColumn: currentQuestion.rightColumn[highlightedRight],
      };
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion._id]: {
          ...prevAnswers[currentQuestion._id],
          [index]: updatedAnswer,
        },
      }));
    }
  };

  const handleRightClick = (index) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (highlightedLeft !== null && currentQuestion) {
      const color = leftColors[highlightedLeft];

      const newRightColors = rightColors.map((currentColor, i) =>
        i === index
          ? color
          : i === previouslySelectedRight && highlightedLeft === null
          ? "white"
          : currentColor
      );

      setRightColors(newRightColors);
      setPreviouslySelectedRight(index);
      setHighlightedRight(index);
      const updatedAnswer = {
        leftColumn: currentQuestion.leftColumn[highlightedLeft],
        rightColumn: currentQuestion.rightColumn[index],
      };
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion._id]: {
          ...prevAnswers[currentQuestion._id],
          [highlightedLeft]: updatedAnswer,
        },
      }));
    }
  };

  const navigate = useNavigate();
  const { Option } = Select;
  const DomainApi = process.env.REACT_APP_DOMAIN_API;

  useEffect(() => {
    const fetchTestData = async () => {
      if (!testId) {
        message.error("Test ID not found. Redirecting...");
        return;
      }

      try {
        const response = await axios.get(`${DomainApi}/question/${testId}`);
        const { test, questions } = response.data;

        setTestName(test.localeData[locale]?.name || test.name);
        setQuestions(questions);
        if (questions.length > 0) {
          const currentQuestion = questions[currentQuestionIndex];
          if (currentQuestion.questionType === 2) {
            setLeftColors(
              new Array(currentQuestion.leftColumn.length).fill("white")
            );
            setRightColors(
              new Array(currentQuestion.rightColumn.length).fill("white")
            );
          }
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
        message.error("Error fetching test data.");
      }
    };
    fetchTestData();
  }, [testId]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion && currentQuestion.questionType === 2) {
        setLeftColors(
          new Array(currentQuestion.leftColumn.length).fill("white")
        );
        setRightColors(
          new Array(currentQuestion.rightColumn.length).fill("white")
        );
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [currentQuestion._id]: {},
        }));
      }
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const checkAnswer = async (question) => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion._id];

    let answerPayload;

    switch (currentQuestion.questionType) {
      case 0: // Multiple Choice
      case 1: // True/False
        answerPayload = {
          questionId: currentQuestion._id,
          selectedAnswer: currentAnswer,
        };
        break;

      case 2: // Matching
        if (!areRightColumnColorsDistinct(rightColors)) {
          message.error(
            "Please ensure there are exactly four distinct colors in the right column."
          );
          return;
        }
        answerPayload = {
          questionId: currentQuestion._id,
          selectedAnswer: Object.values(currentAnswer || {}).map((item) => ({
            leftColumn: item.leftColumn,
            rightColumn: item.rightColumn,
          })),
        };
        break;

      case 3: // Fill-in-the-Blank
        answerPayload = {
          questionId: currentQuestion._id,
          selectedAnswer: [currentAnswer],
        };
        break;

      default:
        return;
    }

    try {
      const response = await axios.post(`${DomainApi}/question/${testId}`, {
        answer: answerPayload,
      });

      const updatedQuestions = response.data.questions;
      const result = updatedQuestions.find(
        (q) => q.questionId === currentQuestion._id
      );

      if (result.isCorrect) {
        message.success("Correct!!!");
      } else {
        message.error("Incorrect!");
      }

      setAggregatedResults((prevResults) => {
        const existingResults = new Map(
          prevResults.map((result) => [result.questionId, result])
        );
        const newResults = [...existingResults.values(), result];
        return newResults;
      });

      setAnsweredQuestions((prevAnswered) => ({
        ...prevAnswered,
        [currentQuestion._id]: true,
      }));

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      }, 1000);
    } catch (error) {
      message.error("Error checking answer. Please try again.");
    }
  };
  useEffect(() => {
    // bỏ vô check answer thì aggregatedResults ko nhận answer cuối
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (isInitialRender2.current) {
      isInitialRender2.current = false;
      return;
    }
    if (
      allQuestionsAnswered() ||
      currentQuestionIndex === questions.length - 1
    ) {
      handleSubmit(aggregatedResults);
    }
  }, [aggregatedResults]);

  const handleSubmit = async (results) => {
    if (!allQuestionsAnswered()) {
      message.warning("Please answer all questions before submitting.");
      return;
    }

    try {
      const updateData = await axios.put(
        `${DomainApi}/playerTest/${playerTestId}`,
        {
          questions: results,
        }
      );
      setPlayerTest(updateData.data);
      setIsQuizCompleted(true);
      message.success("Quiz completed! Redirecting to results page...");
      setTimeout(() => {
        navigate("/test/result");
      }, 1500);
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
          <div className="multiple-choice-container">
            <Radio.Group
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              value={answers[question._id]}
              className="multiple-choice-group"
              buttonStyle="solid"
            >
              <Radio.Button
                value={true}
                className={`multiple-choice-option ${
                  answers[question._id] === true ? "selected" : ""
                }`}
              >
                True
              </Radio.Button>
              <Radio.Button
                value={false}
                className={`multiple-choice-option ${
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
                  <div className="multiple-choice-option-radio">
                    <strong>{String.fromCharCode(65 + index)}. </strong>
                    <span dangerouslySetInnerHTML={{ __html: option }} className="multiple-choice-option-span"/>
                  </div>
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        );

      case 3: // Fill-in-the-Blank
        return (
          <Input
            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            value={answers[question._id] || ""}
            placeholder="Enter your answer"
          />
        );

      case 2: // Matching
        return (
          <div>
            <Row gutter={[16, 16]} className="matchingQuestion">
              <Col span={12}>
                <h3>Left Column</h3>
                {question.leftColumn.map((item, index) => (
                  <div
                    key={index}
                    className="columnItem"
                    onClick={() => handleLeftClick(index)}
                    style={{
                      backgroundColor: leftColors[index],
                      padding: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item }} className="multiple-choice-option-span"/>
                  </div>
                ))}
              </Col>
              <Col span={12}>
                <h3>Right Column</h3>
                {question.rightColumn.map((item, index) => (
                  <div
                    key={index}
                    className="columnItem"
                    onClick={() => handleRightClick(index)}
                    style={{
                      backgroundColor: rightColors[index],
                      padding: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {item}
                  </div>
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
    if (currentQuestion && currentQuestion.questionType === 2) {
      const leftColumnSelected = leftColors.some((color) => color !== "white");
      const rightColumnSelected = rightColors.some(
        (color) => color !== "white"
      );

      return leftColumnSelected && rightColumnSelected;
    }
    const currentQuestionId = currentQuestion._id;
    const answer = answers[currentQuestionId];
    return answer !== undefined && answer !== null && answer !== "";
  };

  const allQuestionsAnswered = () => {
    return questions.every((question) => {
      const answer = answers[question._id];
      if (question.questionType === 2) {
        return (
          answer && Object.keys(answer).length === question.leftColumn.length
        );
      } else {
        return answer !== undefined && answer !== null && answer !== "";
      }
    });
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
          <div className="questionContainer">
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
          onClick={() => debouncedCheckAnswer(questions[currentQuestionIndex])}
          disabled={
            !isAnswerSelected() ||
            answeredQuestions[questions[currentQuestionIndex]._id]
          }
          style={{ marginLeft: "10px" }}
          className="button"
        >
          Answer
        </Button>

        <Button
          type="primary"
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          disabled={currentQuestionIndex <= 0}
          className="button"
        >
          Previous
        </Button>
      </div>
    </div>
  );
};

export default QuizPage;

import React, { useEffect, useState } from "react";
import { Card, List, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Sidebar.style.css";
import { Skeleton } from "antd";

const Sidebar = () => {
  const [references, setReferences] = useState([]);
  const { Text } = Typography;
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const [rankPlayers, setRankPlayers] = useState([]);
  const [infoPlayer, setInfoPlayer] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const locale = localStorage.getItem('locale') || 'en-US';
  const translations = {
    'en-US': {
      leaderboards: "Leaderboards!",
      references: "The references you should read",
      introduce: "INTRODUCE",
      job: "JOB",
      effectiveness: "EFFECTIVENESS",
      investors: "INVESTORS",
      rules: "RULES",
      privacy: "PRIVACY",
      points: "pts",
    },
    'vi-VN': {
      leaderboards: "Bảng Xếp Hạng",
      references: "Các tài liệu bạn nên đọc",
      introduce: "GIỚI THIỆU",
      job: "CÔNG VIỆC",
      effectiveness: "HIỆU QUẢ",
      investors: "NHÀ ĐẦU TƯ",
      rules: "QUY TẮC",
      privacy: "RIÊNG TƯ",
      points: "điểm",
    },
    'ru-RU': {
      leaderboards: "Таблица Лидеров",
      references: "Ссылки, которые вам следует прочитать",
      introduce: "ВВЕДЕНИЕ",
      job: "РАБОТА",
      effectiveness: "ЭФФЕКТИВНОСТЬ",
      investors: "ИНВЕСТОРЫ",
      rules: "ПРАВИЛА",
      privacy: "КОНФИДЕНЦИАЛЬНОСТЬ",
      points: "очков",
    },
  };

  useEffect(() => {
    const fetchReferences = async () => {
      const topicId = localStorage.getItem("selectedTopicId");
      if (topicId) {
        try {
          const response = await axios.get(
            `${DomainApi}/documentation/topic/${topicId}`,
            {
              headers: {
                'Content-Language': locale,
              },
            }
          );
          const referencesData = response.data;

          const shuffled = referencesData.sort(() => 0.5 - Math.random());
          const fiveRandomReferences = shuffled.slice(0, 5);
          // console.log(fiveRandomReferences);
          setReferences(fiveRandomReferences);
        } catch (error) {
          console.error("Error fetching references:", error);
        }
      } else {
        setReferences(null);
      }
    };

    fetchReferences();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const response = await axios.get(`${DomainApi}/player`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setInfoPlayer(response.data);
        } catch (error) {
          console.error("Failed to fetch player data:", error);
        }
      }
    };

    fetchData();
  }, [accessToken]);


  const fetchRankPlayers = async () => {
    try {
      await axios.get(`${DomainApi}/player/rank`).then((response) => {
        setRankPlayers(response.data);

      });
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      fetchRankPlayers();
      setLoading(false);
    }, 500);
  }, []);



  return (
    <div style={{ width: "40%" }} className="responsive-hide">
      <Card title={translations[locale].leaderboards} style={{ marginBottom: "16px" }}>
        {loading ? <Skeleton /> : (
          <ul className="listRankPlayer">
            {rankPlayers.length !== 0 &&
              rankPlayers
                .filter((item) => item.totalScore !== null) // Lọc bỏ các phần tử có totalScore = 0
                .slice(0, Math.min(10, rankPlayers.filter((item) => item.totalScore !== 0).length)) // Lấy tối đa 10 phần tử hoặc số phần tử hiện có nếu ít hơn 10
                .map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        item.email === infoPlayer.email
                          ? "itemRankPlayer active"
                          : "itemRankPlayer"
                      }
                    >
                      <span>#{index + 1}</span>
                      <span className="fullname">{item.fullname}</span>
                      <div className="wrapScore">
                        <span>
                          {item.totalScore !== null ? item.totalScore : 0} {translations[locale].points}
                        </span>
                      </div>
                    </li>
                  );
                })}
          </ul>
        )}

      </Card>
      <Card title={translations[locale].references} className="listRef">
        {references && references.length > 0 ? (
          <List
            size="small"
            dataSource={references}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <Link to={`/documentDetail/${item._id}`}>
                  <Text className="references">{item.name}</Text>
                </Link>
              </List.Item>
            )}
          />
        ) : (
          <Text>No references available to display.</Text>
        )}
      </Card>

      <Row gutter={[16, 16]} className="flex-container">
        <Link to="/introduce">
          <Col className="flex-item">
            <h4>{translations[locale].introduce}</h4>
          </Col>
        </Link>
        <Link to="/job">
          <Col className="flex-item">
            <h4>{translations[locale].job}</h4>
          </Col>
        </Link>
        <Link to="/effectiveness">
          <Col className="flex-item">
            <h4>{translations[locale].effectiveness}</h4>
          </Col>
        </Link>
        <Link to="/investors">
          <Col className="flex-item">
            <h4>{translations[locale].investors}</h4>
          </Col>
        </Link>
        <Link to="/rules">
          <Col className="flex-item">
            <h4>{translations[locale].rules}</h4>
          </Col>
        </Link>
        <Link to="/privacy">
          <Col className="flex-item">
            <h4>{translations[locale].privacy}</h4>
          </Col>
        </Link>
      </Row>
    </div>
  );
};

export default Sidebar;
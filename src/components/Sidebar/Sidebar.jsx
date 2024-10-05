import React, { useEffect, useState } from "react";
import { Card, List, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Sidebar.style.css";



const Sidebar = () => {
  const [references, setReferences] = useState([]);
  const { Text } = Typography;
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const [rankPlayers, setRankPlayers] = useState([])
  const [infoPlayer, setInfoPlayer] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

 
  useEffect(() => {
    const fetchReferences = async () => {
      const topicId = localStorage.getItem("selectedTopicId");
      if (topicId) {
        try {
          const response = await axios.get(
            `${DomainApi}/documentation/topic/${topicId}`
          );
          const referencesData = response.data;
          
          const shuffled = referencesData.sort(() => 0.5 - Math.random());
          const fiveRandomReferences = shuffled.slice(0, 5);

          setReferences(fiveRandomReferences);
        } catch (error) {
          console.error("Error fetching references:", error);
        }
      }
      else {
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
          setInfoPlayer(response.data)
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
useEffect(() => {
    fetchRankPlayers();
  }, [rankPlayers]);

  return (
    <div style={{ width: "40%" }} className="responsive-hide">
      <Card title="Leaderboards!" style={{ marginBottom: "16px" }}>
        <ul className="listRankPlayer">
          {rankPlayers.length !== 0 && rankPlayers.map((item,index) =>{
            return(
              <li key={index} className={item.email === infoPlayer.email ? 'itemRankPlayer active': 'itemRankPlayer'}>#{index+1} 
              <span className="fullname">{item.fullname}</span>
              <span>{item.totalScore !== null ? item.totalScore : 0} pts</span>
              </li>
            )
          })}
        </ul>
      </Card>
      <Card title="The references you should read" className="listRef">
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
      </Card>
      <Row gutter={[16, 16]} className="flex-container">
        <Link to="/">
          <Col className="flex-item">
            <h4>INTRODUCE</h4>
          </Col>
        </Link>
        <Link to="/">
          <Col className="flex-item">
            <h4>EFFECTIVENESS</h4>
          </Col>
        </Link>
        <Link to="/">
          <Col className="flex-item">
            <h4>JOB</h4>
          </Col>
        </Link>
        <Link to="/">
          <Col className="flex-item">
            <h4>INVESTORS</h4>
          </Col>
        </Link>
        <Link to="/">
          <Col className="flex-item">
            <h4>RULES</h4>
          </Col>
        </Link>
        <Link to="/">
          <Col className="flex-item">
            <h4>PRIVACY</h4>
          </Col>
        </Link>
      </Row>
    </div>
  );
};

export default Sidebar;

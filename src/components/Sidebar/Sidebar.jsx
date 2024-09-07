import React, { useEffect, useState } from "react";
import { Card, List, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Sidebar.style.css";

const Sidebar = () => {
  const [references, setReferences] = useState([]);
  const { Text } = Typography;
  const DomainApi = process.env.REACT_APP_DOMAIN_API;

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
    };

    fetchReferences();
  }, []);

  return (
    <div style={{ width: "40%" }} className="responsive-hide">
      <Card title="Leaderboards!" style={{ marginBottom: "16px" }}></Card>
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

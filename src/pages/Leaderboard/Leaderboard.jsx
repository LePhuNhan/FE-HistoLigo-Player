import Menu from '../../components/Menu/Menu';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Leaderboard.css'
import axios from "axios";
import React, { useState, useEffect } from "react";
import Badge_Beg from '../../assets/Badge_Bronze.webp'
import Badge_Int from '../../assets/Badge_Silver.webp'
import Badge_Adv from '../../assets/Badge_Gold.webp'
import Badge_Exp from '../../assets/Badge_Sapphire.webp'
import Badge_Mas from '../../assets/Badge_Ruby.webp'
import NoAvtImg from '../../assets/noAvt.png'
import {
  CrownFilled
} from '@ant-design/icons';
import { Spin } from 'antd';

const translations = {
  'en-US': {
    leaderboard: "Leaderboard",
    rank: "Rank: ",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
    master: "Master",
    points: "points",
  },
  'vi-VN': {
    leaderboard: "Bảng Xếp Hạng",
    rank: "Hạng: ",
    beginner: "Người Mới",
    intermediate: "Trung Cấp",
    advanced: "Nâng Cao",
    expert: "Chuyên Gia",
    master: "Bậc Thầy",
    points: "điểm",
  },
  'ru-RU': {
    leaderboard: "Таблица Лидеров",
    rank: "Ранг: ",
    beginner: "Начинающий",
    intermediate: "Промежуточный",
    advanced: "Продвинутый",
    expert: "Эксперт",
    master: "Мастер",
    points: "очков",
  },
};

const Leaderboard = () => {
  const colors = ["#ffe7f0", '#fff8db', '#e0f7ff'];
  const borderColors = ['#e38a99', '#ffd966', '#b7e3f4']
  const darkBorderColors = ['#3a5d4e', '#b35461', '#2c0091']
  const darkColors = ['#456e5a', '#cf6679', '#3700b3'];
  const theme = localStorage.getItem('theme') === 'true';
  const DomainApi = process.env.REACT_APP_DOMAIN_API;
  const [rankPlayers, setRankPlayers] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const [infoPlayer, setInfoPlayer] = useState([]);
  const [selectRank, setSelectRank] = useState(0);
  const locale = localStorage.getItem('locale') || 'vi-VN';
  const [loading, setLoading] = useState(true);
  const lang = translations[locale] || translations['vi-VN'];
  const refreshToken = localStorage.getItem("refreshToken");

  const getRankName = (rank) => {
    if (rank === 0) return lang.beginner;
    if (rank === 1) return lang.intermediate;
    if (rank === 2) return lang.advanced;
    if (rank === 3) return lang.expert;
    if (rank === 4) return lang.master;
    return "Unknown Rank";
  }
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
          } else {
            console.error("Error fetching player process data:", error);
          }
        }
      }
    };

    fetchData();
  }, [accessToken]);

  const getDataByRank = async () => {
    try {
      const response = await axios.get(`${DomainApi}/player/byRank`, {
        params: {
          rank: selectRank,
        },
      });
      setRankPlayers(response.data);
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false); // Dừng loading sau khi fetch xong
    }
  };

  useEffect(() => {
    setLoading(true);
    getDataByRank();
  }, [selectRank]);
  return (
    <div className='wrapLeaderboard'>
      <div className='row'>
        <div className='col-2 mobile-none'>
          <Menu />
        </div>
        <div className='col-5'>
          <div className='chooseRank'>
            <ul className='listBadge'>
              <li onClick={() => {
                setSelectRank(0);
              }}> <img className='iconBadge' src={Badge_Beg} alt='rankimg' /></li>
              <li onClick={() => {
                setSelectRank(1);
              }}> <img className='iconBadge' src={Badge_Int} alt='rankimg' /></li>
              <li onClick={() => {
                setSelectRank(2);
              }}> <img className='iconBadge' src={Badge_Adv} alt='rankimg' /></li>
              <li onClick={() => {
                setSelectRank(3);
              }}> <img className='iconBadge' src={Badge_Exp} alt='rankimg' /></li>
              <li onClick={() => {
                setSelectRank(4);
              }}> <img className='iconBadge' src={Badge_Mas} alt='rankimg' /></li>
            </ul>
          </div>
          <div className='wrapListRank'>
            <h1 className='title'>{lang.leaderboard}</h1>
            <div>
              {loading ? (<Spin style={{ height: '300px', top: '80px' }} />) : (<ul className='listRank'>

                {rankPlayers.length !== 0 && rankPlayers.map((item, index) => {
                  return (
                    <li key={index} className={`${index < 3 ? 'itemRank' : 'itemRank border'} ${item.email === infoPlayer.email ? 'me' : ''}`} style={{ backgroundColor: theme ? darkColors[index] : colors[index], border: `1px solid ${theme ? darkBorderColors[index] : borderColors[index]}` }}>
                      {index === 0 && (<img className='imgRank' src='https://d35aaqx5ub95lt.cloudfront.net/images/leagues/9e4f18c0bc42c7508d5fa5b18346af11.svg' alt='top1' />)}
                      {index === 1 && (<img className='imgRank' src='https://d35aaqx5ub95lt.cloudfront.net/images/leagues/cc7b8f8582e9cfb88408ab851ec2e9bd.svg' alt='top2' />)}
                      {index === 2 && (<img className='imgRank' src='https://d35aaqx5ub95lt.cloudfront.net/images/leagues/eef523c872b71178ef5acb2442d453a2.svg' alt='top3' />)}
                      {index > 2 && (<span className='orderRank'>#{index + 1}</span>)}

                      <div className={index < 3 ? 'wrapInfo bigSize' : 'wrapInfo'}>

                        <div className='wrapCircle'>
                          {item.email === infoPlayer.email && (<CrownFilled className='me' />)}

                          <div className='circle'>
                            <img src={item.avatar !== null ? item.avatar : NoAvtImg} alt='avatar' />
                          </div>
                        </div>
                        <div className='infoPlayer'>
                          <h3 className={item.email === infoPlayer.email ? 'fullname active' : 'fullname'}>{lang.rank} {getRankName(item.rank)}</h3>
                          <h3 className={item.email === infoPlayer.email ? 'fullname active' : 'fullname'}>{item.fullname}
                          </h3>
                        </div>
                        <div className={item.email === infoPlayer.email ? 'score active' : 'score'}>
                          <h4>{item.totalScore !== null ? item.totalScore : 0} {lang.points}</h4>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>)}



            </div>
          </div>
        </div>
        <div className='col-2 mobile-none'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default Leaderboard;
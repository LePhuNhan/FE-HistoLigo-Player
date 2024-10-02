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


const Leaderboard = () =>{
    const colors = ["#1cb0f6", '#ce82ff', '#ffc800'];
    const DomainApi = process.env.REACT_APP_DOMAIN_API;
    const [rankPlayers, setRankPlayers] = useState([]);
    const accessToken = localStorage.getItem("accessToken");
    const [infoPlayer, setInfoPlayer] = useState([]);

    const getRankName = (rank) =>{
        if (rank === 0) return "Beginner";
        if (rank === 1) return "Intermediate";
        if (rank === 2) return "Advanced";
        if (rank === 3) return "Expert";
        if (rank === 4) return "Master";
        return "Unknown Rank";
    }
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

    return(
        <div className='wrapLeaderboard'>
            <div className='row'>
                <div className='col-2'>
                <Menu/> 
                </div>
                <div className='col-5'>
                  <div className='chooseRank'>
                   <ul className='listBadge'>
                    <li> <img className='iconBadge' src={Badge_Beg} alt='rankimg'/></li>
                    <li> <img className='iconBadge' src={Badge_Int} alt='rankimg'/></li>
                    <li> <img className='iconBadge' src={Badge_Adv} alt='rankimg'/></li>
                    <li> <img className='iconBadge' src={Badge_Exp} alt='rankimg'/></li>
                    <li> <img className='iconBadge' src={Badge_Mas} alt='rankimg'/></li>
                   </ul>
                  </div>
                    <div className='wrapListRank'>
                        <h1 className='title'>Leaderboard</h1>
                        <ul className='listRank'>
                        {rankPlayers.length !== 0 && rankPlayers.map((item,index) =>{
                            return(
                                <li key={index}  className={`${index < 3 ? 'itemRank' : 'itemRank border'} ${item.email === infoPlayer.email ? 'me' : ''}`}  style={{ backgroundColor: colors[index] }}>
                                    {index === 0 && (<img src='https://d35aaqx5ub95lt.cloudfront.net/images/leagues/9e4f18c0bc42c7508d5fa5b18346af11.svg' alt='top1'/>)}
                                    {index === 1 && (<img src='https://d35aaqx5ub95lt.cloudfront.net/images/leagues/cc7b8f8582e9cfb88408ab851ec2e9bd.svg' alt='top2'/>)}
                                    {index === 2 && (<img src='https://d35aaqx5ub95lt.cloudfront.net/images/leagues/eef523c872b71178ef5acb2442d453a2.svg' alt='top3'/>)}
                                    {index > 2 && (<span className='orderRank'>#{index+1}</span>)}
                                   
                               <div className={index < 3 ? 'wrapInfo bigSize' : 'wrapInfo'}>
                                <div className='circle'>
                                  <img src={item.avatar !== null ? item.avatar : NoAvtImg} alt='avatar'/>
                                </div>
                                <div>
                                <h3 className={item.email === infoPlayer.email ? 'fullname active': ''}>Rank: {getRankName(item.rank)}</h3>
                                  <h3 className={item.email === infoPlayer.email ? 'fullname active': 'fullname'}>{item.fullname}  
      
                                  </h3>
                                </div>
                                <div className='score'>
                                  <h4>{item.totalScore !== null ? item.totalScore : 0} points</h4>
                                </div>
                               </div>
                            </li>
                            )
                        })}
                        </ul>
                    </div>
                </div>
                <div className='col-2'>
                    <Sidebar/>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard;
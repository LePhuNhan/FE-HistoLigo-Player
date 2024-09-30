import Menu from '../../components/Menu/Menu';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Leaderboard.css'
import  {CrownFilled} from '@ant-design/icons';
import axios from "axios";
import React, { useState, useEffect } from "react";


const Leaderboard = () =>{
    const colors = ["#1cb0f6", '#ce82ff', '#ffc800', '#ff4b4b'];
    const DomainApi = process.env.REACT_APP_DOMAIN_API;
    const [rankPlayers, setRankPlayers] = useState([]);

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
    

    return(
        <div className='wrapLeaderboard'>
            <div className='row'>
                <div className='col-2'>
                <Menu/> 
                </div>
                <div className='col-5'>
                    <div className='wrapListRank'>
                        <h1 className='title'>Leaderboard</h1>
                        <ul className='listRank'>
                        {rankPlayers.length !== 0 && rankPlayers.map((item,index) =>{
                            return(
                                <li className='itemRank'  style={{ backgroundColor: colors[index % colors.length] }}>
                                <span className='orderRank'>#{index+1}</span>
                               <div className='wrapInfo'>
                               <h3>Rank: {getRankName(item.rank)}</h3>
                                <h3 className='fullname'>{item.fullname}  <CrownFilled style={{color: 'yellow'}}  /></h3>
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
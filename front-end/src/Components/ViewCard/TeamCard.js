import React, { useEffect, useState } from 'react';
import './View.css';
import axios from 'axios';

const Player = ({ name, players }) => {
    const [read, setRead] = useState(false);
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = players.map(id =>
                    axios.get(`${process.env.REACT_APP_SERVER}/api/v1/players/${id}`)
                );
                const responses = await Promise.all(promises);
                const playerDetails = responses.map(res => res.data);
                setPlayerData(playerDetails);
            } catch (error) {
                console.log("Error fetching player data:", error);
            }
        };

        fetchData();
    }, [players]);

    return (
        <div className='player-container'>
            <div className='flex gap-5'>
                <h1 className='text-3xl text-white'>NAME:</h1>
                <h1 className='text-2xl text-teal-300 self-center'>{name}</h1>
            </div>
            {read && (
                <div className='players'>
                    {playerData.map(player => (
                        <h1 key={player.id}>{player.name}</h1>
                    ))}
                </div>
            )}
            <button onClick={() => setRead(prev => !prev)}>
                {!read ? "READ MORE" : "READ LESS"}
            </button>
        </div>
    );
};

export default Player;

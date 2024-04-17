import React, { useEffect, useState } from 'react';
import './View.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const Player = ({ id, name, phone, description, social, team, year, achievements, setFormData, setUpdateId ,handleDelete}) => {
    const [read, setRead] = useState(false);
    const [Team, setTeam] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/teams/${team}`)
                console.log("Player id in card", id);
                setTeam(res.data.name)
            } catch (error) {
                console.log("Error fetching player data:", error);
            }
        };

        fetchData();
    }, [team]);

    const handleUpdate = (e) => {
        e.preventDefault()
        // console.log("id in card", id)
        setFormData({
            name: name,
            team: team,
            year: year,
            description: description,
            phoneNumber: phone,
            socialMedia: { instagram: social.instagram, twitter: social.twitter },
            achievements: { sports: "sports", text: "something" }
        });
        setUpdateId(id)
    }

    return (
        <div className='player-container'>
            <div className='flex gap-5'>
                <h1 className='text-3xl text-white'>NAME:</h1>
                <h1 className='text-2xl text-teal-300 self-center self-center'>{name}</h1>
            </div>

            {read && (
                <>
                    <div className='flex gap-2'>
                        <h1 className='text-2xl text-white'>ABOUT:</h1>
                        <h1 className='text-1xl text-teal-300 self-center'>{description}</h1>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-2xl text-white'>PHONE NUMBER:</h1>
                        <h1 className='text-1xl text-teal-300 self-center'>{phone}</h1>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-2xl text-white'>SOCIAL MEDIA:</h1>
                        <div className='flex flex-col gap-2 '>
                            <button className='social text-teal-300 text-1xl '><FontAwesomeIcon icon={faInstagram} />&nbsp;&nbsp;{social.instagram}</button>
                            <button className='social text-teal-300 text-1xl '><FontAwesomeIcon icon={faTwitter} />&nbsp;&nbsp;{social.twitter}</button>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-2xl text-white'>TEAM:</h1>
                        <h1>{Team}</h1>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-2xl text-white'>YEAR:</h1>
                        <h1 className='text-1xl text-teal-300 self-end'>{year}</h1>
                    </div>
                </>
            )}
            <div>
                <button className='read' onClick={() => setRead(prev => !prev)}>
                    {!read ? "READ MORE" : "READ LESS"}
                </button>
                <button className='update' onClick={handleUpdate}>UPDATE</button>
                <button className='delete' onClick={()=>{handleDelete({id})}}>DELETE</button>
            </div>
        </div>
    );
};

export default Player;

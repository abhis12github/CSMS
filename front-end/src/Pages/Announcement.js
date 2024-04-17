import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../Components/AnnouncementCard/AnnouncementCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Announcement = () => {
    const [current, setCurrent] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(2);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/announcements/getAll`);
            console.log('API Response:', res.data); // Log API response
            setData(res.data.announcements); // Update data state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log('Data:', data); // Log data state
        showSlide();
    }, [start, end, data]);

    const showSlide = () => {
        console.log('showSlide called'); // Log showSlide function call
        const newUpdates = [];
        for (let i = start; i <= end && i < data.length; i++) {
            newUpdates.push({ title: data[i].title, description: data[i].content });
        }
        setCurrent(newUpdates);
    };

    const handleLeft = () => {
        if (start > 0) {
            setStart(start - 1);
            setEnd(end - 1);
        }
    };

    const handleRight = () => {
        if (end < data.length - 1) {
            setStart(start + 1);
            setEnd(end + 1);
        }
    };

    return (
        <>
            <div className='announce-container'>
                <h1 className='text-white text-center text-7xl mb-36'>ANNOUNCEMENT</h1>
                <div className='text-white flex justify-evenly'>
                    <button onClick={handleLeft}><FontAwesomeIcon icon={faAngleLeft} /></button>
                    {current.map((item, index) => (
                        <AnnouncementCard key={index} title={item.title} description={item.description} />
                    ))}
                    <button onClick={handleRight}><FontAwesomeIcon icon={faAngleRight} /></button>
                </div>
            </div>
        </>
    );
};

export default Announcement;

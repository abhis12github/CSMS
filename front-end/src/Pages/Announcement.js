import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../Components/AnnouncementCard/AnnouncementCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { useAuth } from '../Context/auth';

const Announcement = () => {
    const [current, setCurrent] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(2);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [auth, setAuth] = useAuth()

    const headers = {
        // Your headers here, including Authorization header with JWT token
        Authorization: `Bearer ${auth.token}`,
        // Other headers if needed
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log("token in getall :",auth.token);
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/announcements/getAll`, { headers: { authorization: `Bearer ${auth.token}` } });
            console.log('API Response:', res.data); // Log API response
            setData(res.data.announcements); // Update data state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // console.log('Data:', data); // Log data state
        showSlide();
    }, [start, end, data]);

    const showSlide = () => {
        const newUpdates = [];
        for (let i = start; i <= end && i < data.length; i++) {
            newUpdates.push({ id: data[i]._id, title: data[i].title, description: data[i].content });
        }
        setCurrent(newUpdates);
        // console.log("surrent",current)
    };

    const handleDelete = async ({ id }) => {
        try {
            // console.log("deleting id", id);
            const res = await axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/announcements/${id}`)
            alert("Announcement Deleted")
        } catch (error) {
            console.log(error);
        }
    }

    const addAnnouncement = async (e) => {

        e.preventDefault()
        try {
            //  console.log("title",title);
            //  console.log("content",content);
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/announcements/create`, {
                title,
                content
            }, { headers: { authorization: `Bearer ${auth.token}` } })
            alert("Content added")
            fetchData()
        } catch (error) {
            console.log(error);
        }

    }


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
            <Navbar />
            <div className='announce-container'>
                <h1 className='text-white text-center text-7xl mb-36'>ANNOUNCEMENT</h1>
                {auth.user.isAdmin &&
                    <div className='flex flex-col justify-center items-center mb-10'>
                        <input className='input my-3' placeholder='TITLE' name='title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        <input className='input my-3' placeholder='CONTENT' name='content' value={content} onChange={(e) => { setContent(e.target.value) }} />
                        <button className='w-32 self-center text-green-500 hover:text-white border-solid border-2 border-green-500 hover:bg-green-500 p-2 px-4 transition-all my-3 ' onClick={addAnnouncement}>ADD</button>
                    </div>
                }
                <div className='text-white flex justify-evenly'>
                    <button onClick={handleLeft}><FontAwesomeIcon icon={faAngleLeft} /></button>
                    {current.map((item, index) =>
                        <AnnouncementCard key={index} id={item.id} title={item.title} description={item.description} setTitle={setTitle} setContent={setContent} handleDelete={handleDelete} />
                    )}
                    <button onClick={handleRight}><FontAwesomeIcon icon={faAngleRight} /></button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Announcement;

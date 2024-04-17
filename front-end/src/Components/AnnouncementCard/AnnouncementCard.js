import React from 'react'
import './AnnouncementCard.css'

const AnnouncementCard = ({ title, description }) => {
    return (
        <div className='card-container text-white'>
            <h1 className='text-3xl'><b>{title}</b></h1>
            <h3 className='text-2xl'>{description}</h3>
        </div>
    )
}

export default AnnouncementCard

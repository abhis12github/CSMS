import React, { useEffect } from 'react'
import './Pages.css'
import image from '../Assets/logo.jpg'
import football from '../Assets/football.png'
import rugby from '../Assets/rugby-ball.png'
import cricket from '../Assets/cricket.png'
import vollyball from '../Assets/volleyball.png'
import shuttle from '../Assets/shuttlecock.png'
import About from './About'
import Announcement from './Announcement'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { useAuth } from '../Context/auth'

const Home = () => {
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        console.log("user token",auth.token)
    }, [auth])
    return (
        <>
            <Navbar />
            <div className='home-container flex justify-between'>
                <div className='text flex flex-col  text-white z-10'>
                    <div className='mb-44'>
                        <p className='text-3xl '>IIIT Ranchi Sport</p>
                        <h1 className='text-7xl'>LET THE GAME <br /> BEGINS</h1>
                    </div>
                    <div className='flex flex-col text-white'>
                        <p className='text-2xl'>This is a website that present the IIIT Ranchi <br />Sports community.</p>
                        <div className='flex justify-center mt-3'>
                            <button>Link1</button>
                            <button>Link2</button>
                        </div>
                    </div>
                </div>
                <div className='flex z-10'>
                    <h1 className='motto text-white self-center text-8xl'>LET THE RACE<br /> BEGIN</h1>
                    <img className='banner' src={image} />
                </div>
                <div className='drop-fade'></div>
            </div>
            {/* <div className='line'>
                <img src={football}/>
                <img src={rugby}/>
                <img src={cricket}/>
                <img src={vollyball}/>
                <img src={shuttle}/>
            </div> */}
            <About />
            <Footer />
        </>
    )
}

export default Home

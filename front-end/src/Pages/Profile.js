import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { useAuth } from '../Context/auth'
import axios from 'axios'
import View from '../Components/ViewCard/View'
import TeamCard from '../Components/ViewCard/TeamCard'

const Profile = () => {
    const [auth, setAuth] = useAuth()
    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const [updateId, setUpdateId] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        team: "661bc5de43034f0e5219ab93",
        year: 0,
        description: "",
        phoneNumber: "",
        socialMedia: { instagram: "", twitter: "" },
        achievements: { sports: "", text: "" }
    });

    useEffect(() => {
        fetchAllPlayers()
        fetchAllTeams()
    }, [])

    const fetchAllPlayers = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/players/`)
            setPlayers(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAllTeams = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/teams/`)
            setTeams(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addPlayer = async (e) => {
        e.preventDefault();
        try {
            // console.log(formData);
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/players/`, formData);
            // Reset form data after successful submission
            setFormData({
                name: "",
                team: "",
                year: "",
                description: "",
                phoneNumber: "",
                socialMedia: { instagram: "", twitter: "" },
                achievements: { sports: "", text: "" }
            });
            fetchAllPlayers(); // Update players list after adding a new player
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async({ id }) => {
        try {
             const res=await axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/players/${id}`)
             alert("deleted successfully")
             fetchAllPlayers()
        } catch (error) {
            console.log(error);
        }
    }

    const addTeam = async (e) => {
        e.preventDefault();
        try {
            // console.log(formData);
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/players/`, formData);
            console.log(res.data);
            // Reset form data after successful submission
            setFormData({
                name: "",
                team: "",
                year: "",
                description: "",
                phoneNumber: "",
                socialMedia: { instagram: "", twitter: "" },
                achievements: { sports: "", text: "" }
            });
            fetchAllPlayers(); // Update players list after adding a new player
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            console.log("update id", updateId)

            const data = {
                name: formData.name,
                team: formData.team,
                year: formData.year,
                description: formData.description,
                phoneNumber: formData.phoneNumber,
                socialMedia: { instagram: formData.socialMedia.instagram, twitter: formData.socialMedia.twitter },
                achievements: { sports: formData.achievements.sports, text: formData.achievements.text }
            }
            console.log(data)
            const res = await axios.put(`${process.env.REACT_APP_SERVER}/api/players/${updateId}`, { data })
            setFormData({
                name: "",
                team: "",
                year: "",
                description: "",
                phoneNumber: "",
                socialMedia: { instagram: "", twitter: "" },
                achievements: { sports: "", text: "" }
            });
            setUpdateId("")

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Navbar />
            <div className='profile-container'>
                <div>
                    <div className='flex gap-10'>
                        <h1 className='text-6xl text-white'><b>NAME </b>:</h1>
                        <h1 className='text-5xl text-teal-300 self-center'>{auth.user.fullname}</h1>
                    </div>
                    <div className='flex gap-10'>
                        <h1 className='text-6xl text-white'><b>EMAIL </b>:</h1>
                        <h1 className='text-5xl text-teal-300 self-center'>{auth.user.email}</h1>
                    </div>
                    {auth.user.isAdmin &&
                        <>
                            <div className='mt-44'>
                                <h1 className='text-white text-7xl'>PLAYERS</h1>
                                <div className='playerForm flex flex-col items-center'>
                                    <input type='text' name='name' placeholder='NAME' value={formData.name} onChange={handleChange} />
                                    {/* <input type='text' name='team' placeholder='TEAM' value={formData.team} onChange={handleChange} /> */}
                                    <input type='number' name='year' placeholder='YEAR' value={formData.year} onChange={handleChange} />
                                    <input type='text' name='description' placeholder='ABOUT YOU' value={formData.description} onChange={handleChange} />
                                    <input type='text' name='phoneNumber' placeholder='PHONE' value={formData.phoneNumber} onChange={handleChange} />
                                    <input type='text' name='instagram' placeholder='INSTAGRAM' value={formData.socialMedia.instagram} onChange={(e) => setFormData(prevState => ({ ...prevState, socialMedia: { ...prevState.socialMedia, instagram: e.target.value } }))} />
                                    <input type='text' name='twitter' placeholder='TWITTER' value={formData.socialMedia.twitter} onChange={(e) => setFormData(prevState => ({ ...prevState, socialMedia: { ...prevState.socialMedia, twitter: e.target.value } }))} />
                                    <input type='text' name='sports' placeholder='SPORTS' value={formData.achievements.sports} onChange={(e) => setFormData(prevState => ({ ...prevState, achievements: { ...prevState.achievements, sports: e.target.value } }))} />
                                    <input type='text' name='text' placeholder='TEXT' value={formData.achievements.text} onChange={(e) => setFormData(prevState => ({ ...prevState, achievements: { ...prevState.achievements, text: e.target.value } }))} />
                                    <div className='flex '>
                                        <button onClick={addPlayer} className='read'><p className='p-2 px-3'>ADD</p></button>
                                        <button className='update ' style={{ marginLeft: "10px" }} onClick={handleUpdate}><p className='p-2 px-3'>UPDATE</p></button>
                                    </div>

                                </div>
                                <div>
                                    {players.map((p) =>
                                        <View id={p._id} name={p.name} description={p.description} phone={p.phoneNumber} social={p.socialMedia} year={p.year} team={p.team} achievements={p.achievements} setFormData={setFormData} setUpdateId={setUpdateId} handleDelete={handleDelete}/>
                                    )}
                                </div>
                            </div>
                            <div className='mt-44'>
                                <h1 className='text-white text-7xl'>TEAMS</h1>
                                <div>
                                    {teams.map((p) =>
                                        <TeamCard key={p._id} name={p.name} players={p.players} />
                                    )}
                                </div>
                            </div>
                        </>
                    }
                </div>

            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Profile;

import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import LoginForm from '../Components/LoginForm/LoginForm'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../Context/auth'


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate()
    const [auth,setAuth]=useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:2030/api/v1/announcements/login`, {
                email,
                password,
            });
            console.log(res)
            if (res && res.data) {
                alert(res.data && res.data.message)
                setAuth({
                    user: res.data.userFound,
                    token: res.data.token
                })
                console.log(auth.user)
                // localStorage.setItem('auth', JSON.stringify(res.data.userFound))
                navigate("/");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <>
            <Navbar />
            <LoginForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit}/>
            <Footer />
        </>
    )
}

export default Login

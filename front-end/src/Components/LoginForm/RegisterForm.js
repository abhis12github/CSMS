import React from 'react'
import './LoginForm.css'

const RegisterForm = ({ email, password, fullname, setEmail, setFullname, setPassword,handleSubmit }) => {
    return (
        <div>
            <div className='login-container flex-col gap-8'>
                <h1 className='text-teal-300 text-6xl'>REGISTER</h1>
                <div >
                    <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="EMAIL" class="input" name="email" type="text" />
                        <input value={fullname} onChange={(e) => { setFullname(e.target.value) }} placeholder="NAME" class="input" name="text" type="text" />
                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="PASSWORD" class="input" name="password" type="password" />
                        <button type='submit'>LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm

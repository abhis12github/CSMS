import React from 'react'
import './LoginForm.css'

const LoginForm = ({ email, password, setEmail, setPassword, handleSubmit }) => {
    return (
        <div className='login-container flex-col gap-9'>
            <h1 className='text-teal-300 text-5xl'>LOGIN</h1>
            <div >
                <form className='flex flex-col gap-10' onSubmit={handleSubmit}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="EMAIL" class="input" name="email" type="text" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PASSWORD" class="input" name="passwords" type="password" />
                    <button type={'submit'}>LOGIN</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm

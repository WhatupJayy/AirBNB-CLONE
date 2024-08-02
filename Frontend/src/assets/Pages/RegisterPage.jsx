import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function registerUser(ev){
        ev.preventDefault();
        try{
          await axios.post('/register', {
            name,
            email,
            password
        });
        alert("Registration successful. Now you can Login.")
        } catch(e){
          alert('Registration failed. Please try again later.')
        }
    }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-3xl text-center my-3 font-semibold'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={registerUser}>
        <input type="text" placeholder='Enter your name' 
            value={name} 
            onChange={ev => setName(ev.target.value)}
            required />
        <input type="email" placeholder='Enter your Email'
            value={email} 
            onChange={ev => setEmail(ev.target.value)}
            required />
        <input type="password" placeholder='Enter password' 
            value={password} 
            onChange={ev => setPassword(ev.target.value)}
            required />
        <button className='primary'>Register</button>
        <div className='text-center py-2 text-gray-500'>Already have an account? <Link className='underline text-black' to={'/login'}> Login Now</Link>
        </div>
      </form>

      </div>
    </div>
  )
}

export default RegisterPage

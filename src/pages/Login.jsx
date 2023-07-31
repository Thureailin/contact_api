import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Loader, PasswordInput, TextInput } from '@mantine/core';
import { useLoginMutation } from '../redux/api/authApi';
import { addUser } from '../redux/services/authSlice';


const Login = () => {
  const[email,setEmail] = useState("minmawgun456@gmail.com")
  const[password,setPassword] = useState("09100200300")

  const nav = useNavigate()
  const [login,{isLoading}] = useLoginMutation();

  const disptach = useDispatch();

  const loginHandler = async(e) =>{
    try{
      e.preventDefault()
    const user ={email,password}
    const {data} = await login(user)
    disptach(addUser({user:data?.user,token:data?.token}))
    if(data?.success === true)
      nav('/')
    
    }catch(error){
      console.log(error)
    }
    
  }

  return (
    <div className='flex justify-center items-center h-screen'>
        <form onSubmit={loginHandler} className='w-96 flex flex-col shadow-lg gap-10 p-7'>
        <h2 className='text-gray-900 font-medium text-2xl'>Login</h2>
            <TextInput onChange={(e)=>setEmail(e.target.value)} placeholder='Your name ....' value={email}/>
            <PasswordInput onChange={(e)=>setPassword(e.target.value)} placeholder='Your password.....' value={password}/>
            <div className='flex gap-3'>
                <p className='select-none text-gray-900'>You Don't have an account?</p>
                <Link to={'/register'}>
                <p className='cursor-pointer select-none text-gray-700'>Register</p>
                </Link>
            </div>
            <button disabled={isLoading && true} className='text-white bg-blue-800 py-1 px-4' type='submit'>
              {isLoading ? (<Loader color="grape" />) : ("Login")}
              </button>
        </form>
    </div>
  )
}

export default Login
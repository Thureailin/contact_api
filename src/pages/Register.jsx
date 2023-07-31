import { PasswordInput, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Loader } from '@mantine/core';
import { useRegisterMutation } from '../redux/api/authApi';

const Register = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [password_confirmation,setPasswordConfirmation] = useState("");

  // const [user,setUser] = useState({
  //   name:"",
  //   email:"",
  //   password:"",
  //   confrimPassword:""
  // });

  // const handleChange = () =>{
  //   setUser({
  //     ...user,
  //     [e.target.name]:[e.target.value]
  //   })
  // }
    
  const nav = useNavigate()

  const [register,{isLoading}] = useRegisterMutation()

  // if(isLoading){
  //   retrun(
  //     <div className='flex justify-center items-center h-screen'>
  //         <h2 className=''>Loading......</h2>
  //     </div>
  //   )
  // }

  const registerHandler = async (e) =>{
   
   try{
      e.preventDefault()
      const user ={name,email,password,password_confirmation}
      const {data} = await register(user)
      // console.log(data)
      // console.log(user)
      if(data?.success === true){
        nav('/login')
      }
    }catch(error){
      console.log(error)
    }
      
        
      
    
      
  };

  return (
    <div className='flex justify-center items-center h-screen'>
        <form onSubmit={registerHandler} className='w-96 flex flex-col shadow-lg gap-10 p-7'>
        <h2 className='text-gray-900 font-medium text-2xl'>Register</h2>
            <TextInput onChange={(e) =>setName(e.target.value) } placeholder='Your name ....' value={name}/>
            <TextInput  onChange={(e) =>setEmail(e.target.value)} placeholder='Your name ....' value={email}/>
            <PasswordInput  onChange={(e) =>setPassword(e.target.value)} placeholder='Your password.....' value={password}/>
            <PasswordInput  onChange={(e) =>setPasswordConfirmation(e.target.value)} placeholder='Password Confrimation......' value={password_confirmation}/>
            <div className='flex gap-3'>
                <p className='select-none text-gray-900'>Already have an account?</p>
                <Link to={'/login'}>
                <p className='cursor-pointer select-none text-gray-700'>LogIn</p>
                </Link>
            </div>
            <button disabled={isLoading && true} className='text-white bg-blue-800 py-1 px-4' type='submit'>
              {isLoading ? (<Loader color="grape" />) : ("Sign-up")}
            </button>
        </form>
    </div>
  )
}

export default Register
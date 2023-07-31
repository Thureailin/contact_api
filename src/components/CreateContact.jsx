import React, { useState } from 'react'
import { useCreateContactMutation } from '../redux/api/contactApi';
import { useNavigate } from 'react-router-dom';
import { TextInput,Loader } from '@mantine/core';
import Cookies from 'js-cookie';

const CreateContact = () => {
    const[name,setName] = useState("");
    const[phone,setPhone] = useState("");
    const[email,setEmail] = useState("");
    const[address,setAddress] = useState("");
    const token = Cookies.get("token")
    const[createContact,{isLoading}] = useCreateContactMutation();
    const nav = useNavigate()

    const createHandler = async(e) =>{
        try{
            e.preventDefault()
            const newData = {name,phone,email,address,}
            const {data} = await createContact({data:newData,token})
            // console.log(dd)
            // console.log(data)
           if(data?.success)
            nav('/')
        }catch(error){
            console.log(error)
        }
       
    }

  return (
    <div className='flex flex-col justify-center items-center mt-20 '>
         <form onSubmit={createHandler} className=' rounded-[8px] w-96 flex flex-col shadow-lg gap-10 p-7'>
        <h2 className='text-gray-900 font-medium text-2xl'>Create Contact</h2>
            <TextInput onChange={(e)=>setName(e.target.value)} placeholder='Your name ....' value={name}/>
            <TextInput  onChange={(e)=>setPhone(e.target.value)} placeholder='Your phone....' value={phone}/>
            <TextInput onChange={(e)=>setEmail(e.target.value)} placeholder='Your email ....' value={email}/>
            <TextInput onChange={(e)=>setAddress(e.target.value)} placeholder='Your address ....' value={address}/>
        
            <button disabled={isLoading && true} className='text-white rounded-[8px]  bg-cyan-800 py-1 px-4' type='submit'>
              {isLoading ? (<Loader color="grape" />) : ("Create")}
              </button>
        </form>
    </div>
  )
}

export default CreateContact
import Cookies from 'js-cookie'
import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../redux/api/authApi'
import { useDispatch} from 'react-redux'
import { removeUser } from '../redux/services/authSlice'

const Navbar = () => {
 
    const user  =JSON.parse(Cookies.get("user")) 
    const token =Cookies.get("token")
    const dispatch = useDispatch()
    const [logout] = useLogoutMutation( )
    const nav = useNavigate()
    
   
   

    const logoutHandler = async() =>{
        
        const {data} = await logout(token)
        dispatch(removeUser("user"))
        if(data?.success){
            nav('/login')
        }
    }
  return (
    <div className='flex justify-around p-7 shadow items-center'>
        <h2 className='text-2xl text-gray-700 font-semibold '>MMS</h2>
         <div className='flex items-center gap-5 '>
            <div className='flex flex-col gap-3 '></div>
            <p className='text-gray-500 font-medium'>{user?.name}</p>
            <p className='text-gray-500 font-medium'>{user?.email}</p>
            </div>
            
            <button onClick={logoutHandler} className='rounded-[6px] bg-red-500 text-white px-4 py-1'>Logout</button>
            
        </div>
  
  )
}

export default Navbar
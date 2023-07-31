import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Routeguard from '../components/RouteGuard'
import CreateContact from '../components/CreateContact'

const Path = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Routeguard><Dashboard/></Routeguard>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/create' element={<CreateContact/>}/> 
        </Routes>
    </div>
  )
}

export default Path
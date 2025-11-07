import {Route, Routes} from 'react-router-dom';
import React from 'react'
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />

    </Routes>
  )
}

export default AppRoutes
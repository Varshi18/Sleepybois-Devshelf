import React from 'react'
import Navbar from '../Navbar/Navbar'
import { useAuth } from '../../context/AuthProvider';

function userinfo() {
  const [authUser, setAuthUser] = useAuth();
  
  return (
    <>
    <div className="h-screen bg-[#ffffff] dark:bg-[#04060B]">
    <Navbar/>
    <div className="pt-52">
      <h1>This is the user id <span>{authUser._id}</span></h1>
      <h1>This is the user email id <span>{authUser.email}</span></h1>
    </div>
    </div>
    </>
  )
}

export default userinfo

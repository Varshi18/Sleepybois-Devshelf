import React from 'react'
import AllBooks from './Pages/All Books/AllBooks'
import Home from './Pages/home/Home'
import { Navigate, Route, Routes } from "react-router-dom"
import Signup from './Pages/Signup/Signup'
import { Toaster } from 'react-hot-toast';
import BookDetail from './Pages/BookDetail/BookDetail'
import { useAuth } from './context/AuthProvider'
import UserInfo from './components/UserInfo/UserInfo'

function App() {

  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
    <>
    <div className="dark:bg-[#04060B] dark:text-white">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/allBooks" element={<AllBooks/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/User" element={authUser ? <UserInfo /> : <Navigate to= "/" />} />
      <Route path="/bookDetail/:_id" element={<BookDetail/>}/>
    </Routes>
    <Toaster />
    </div>
    </>
  )
}

export default App

// 55:00
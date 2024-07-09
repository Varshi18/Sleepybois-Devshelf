import React from 'react'
import AllBooks from './Pages/All Books/AllBooks'
import Home from './Pages/home/Home'
import {Route, Routes } from "react-router-dom"
import Signup from './Pages/Signup/Signup'
import { Toaster } from 'react-hot-toast';
import BookDetail from './Pages/BookDetail/BookDetail'

function App() {
  return (
    <>
    <div className="dark:bg-[#04060B] dark:text-white">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/allBooks" element={<AllBooks/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/book-detail/:_id" element={<BookDetail/>} />
      <Route path="/User" element={authUser ? <UserInfo /> : <Navigate to= "/" />} />
    </Routes>
    <Toaster />
    </div>
    </>
  )
}

export default App

// 55:00
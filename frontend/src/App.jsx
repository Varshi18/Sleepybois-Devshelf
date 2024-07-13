import React from 'react'
import AllBooks from './Pages/All Books/AllBooks'
import Home from './Pages/home/Home'
import { Navigate, Route, Routes } from "react-router-dom"
import Signup from './Pages/Signup/Signup'
import { Toaster } from 'react-hot-toast';
import BookDetail from './Pages/BookDetail/BookDetail'
import { useAuth } from './context/AuthProvider'
import UserInfo from './Components/UserInfo/UserInfo'
import Computer from './Pages/Computer Science/Computer'
import Electrical from './Pages/Electrical/Electrical'
import Mechanical from './Pages/Mechanical/Mechanical'

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
      <Route path="/computer" element={<Computer/>}/>
      <Route path="/electrical" element={<Electrical/>}/>
      <Route path="/mechanical" element={<Mechanical/>}/>
      <Route path="/book-detail/:_id" element={<BookDetail/>}/>
      <Route path="/User" element={authUser ? <UserInfo /> : <Navigate to= "/" />} />
    </Routes>
    <Toaster />
    </div>
    </>
  )
}

export default App




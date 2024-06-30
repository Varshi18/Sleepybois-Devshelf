import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Footer from './components/Footer'
import axios from "axios"

function App() {
  const[book, setBook] = useState([])
  useEffect(()=>{
      const getBook= async()=>{
        try {
          const res =await axios.get("http://localhost:4001/book");
          console.log("got the data maybe");
          console.log(res.data);
          setBook(res.data)
        } catch (error) {
            console.log("error:", error);
        }
      };
      getBook();
  }, [])
  return (
    <>
    <Navbar/>
    <Banner/>
    <Footer/>
    </>
  )
}

export default App

// 55:00
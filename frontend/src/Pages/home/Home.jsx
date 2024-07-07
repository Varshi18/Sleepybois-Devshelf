import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import Recommended from '../../components/Recommended/Recommended'
import Footer from '../../components/Footer/Footer'
import axios from "axios"


function Home() {
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
    <Recommended/>
    <Footer/>
    </>
  )
}

export default Home

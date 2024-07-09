import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Bookcard from "../Bookcard/Bookcard";
import './Recommended.css';


const me = "Computer Science"

function Recommended() {
  const[book, setBook] = useState([])
  useEffect(()=>{
      const getBook= async()=>{
        try {
          const res =await axios.get("http://localhost:4001/book");
          const data =res.data.filter((data)=>data.department===me)
          setBook(data);
        } catch (error) {
            console.log("error:", error);
        }
      };
      getBook();
  }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows:true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 0,  
              dots: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 0, 
              dots: true
            }
          }
        ]
      };
  return (<>
    <div className="max-w-screen-2x1 container my-20 mx-auto md:px-20 px-6">
      <div>
      <h1 className="font-semibold text-xl pb-2">Recommended Books </h1>
      </div>
    <div className="max-w-screen-2x1 container mx-auto md:px-1 px-1">
    <Slider {...settings}>
     {book.map((item)=>(
            <Bookcard className='bookcard' item= {item} key={item.id}/>
        ))}
      </Slider>
    </div>
 </div>
    </>
  )
}

export default Recommended
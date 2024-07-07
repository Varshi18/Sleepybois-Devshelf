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
//1:19:00
//instead of Cards in line 73 put Bookcard

// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import './Recommended.css';
// import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
// import axios from "axios";
// import Bookcard from "../Bookcard/Bookcard";
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const me = "Computer Science"

// const Recommended = () => {
//   const[book, setBook] = useState([])
//   useEffect(()=>{
//       const getBook= async()=>{
//         try {
//           const res =await axios.get("http://localhost:4001/book");
//           const data =res.data.filter((data)=>data.department===me)
//           setBook(data);
//         } catch (error) {
//             console.log("error:", error);
//         }
//       };
//       getBook();
//   }, [])
//   return (
//     <div className='container'>
//       <h1 className='heading'>Recommended Books</h1>
//       <Swiper
//       effect='coverflow'
//       grabCursor = {true}
//       centeredSlides={true}
//       loop={true}
//       slidesPerView={5}
//       coverflowEffect={
//         {
//           rotate:0,
//           stretch:0,
//           depth:100,
//           modifier:2.5
//         }}
//         pagination={{visible:true,clickable:true}}
//         navigation={{
//           nextEl:'.swiper-button-next',
//           prevEl:'.swiper-button-prev',
//           clickable:true
//         }}
//         modules={[EffectCoverflow,Pagination,Navigation]}
//         className='swiper_container'
//       >
//         {book.map((item)=>(
//           <SwiperSlide>
//             <Bookcard item= {item} key={item.id}/>
//           </SwiperSlide>
//         ))}
//         <div className="swiper-controller">
//           <div className="swiper-button-prev slider-arrow">
//           </div>
//           <div className="swiper-button-next slider-arrow">
//           </div>
//         </div>
//       </Swiper>
//     </div>
//   )
// }

// export default Recommended
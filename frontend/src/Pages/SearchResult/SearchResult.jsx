import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Bookcard from '../../Components/Bookcard/Bookcard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SearchResult.css'



function SearchResult() {
  const { keyword } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/book/search/${keyword}`);
        setBooks(response.data);
      } catch (error) {
        setError('Error fetching search results. Please try again later.');
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [keyword]);


  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      }
    ]
  };


  const renderBooksSlider = (category) => {
    const filteredBooks = books.filter(book => book.matchType === category);
    if (filteredBooks.length === 0) return null;

    return (
      <div key={category} className="mt-8">
        <h2 className="text-xl text-gray-500 mb-4">{`Books matched by "${category}"`}</h2>
        <Slider {...sliderSettings}>
          {filteredBooks.map(book => (
            <Bookcard className='bookcard' item= {book} key={book.id}/>
          ))}
        </Slider>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-[#ffffff] dark:bg-[#04060B] dark:text-[#ffffff]">
        <div className="flex-grow max-w-screen-2xl container mx-auto md:px-20 px-6 py-32">
          <h1 className="text-4xl font-semibold">
          {keyword ? `Search Results for "` : 'No search query provided'}
            <span className="text-blue-600">{keyword}</span>
            {keyword ? `"` : ''}
          </h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div>
              {renderBooksSlider('Title')}
              {renderBooksSlider('Description')}
              {renderBooksSlider('Author')}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SearchResult;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookcard from '../../components/Bookcard/Bookcard';
import './allbooks.css';

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4001/book');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
    <div className='body'>
      <h1 className='title'>All Books</h1>
      <div className="grid-container">
        {books.map((item) => (
          <Bookcard item= {item} key={item.id} /> // Spread the book properties as props to the Book component
        ))}
      </div>
    </div>
    </>
  );
};

export default AllBooks;
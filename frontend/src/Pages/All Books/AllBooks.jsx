// Inside AllBooks.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookcard from '../../Components/Bookcard/Bookcard';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './allbooks.css';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDepartment, setSelectedDepartment] =useState('');
  const [sortOrder, setSortOrder] = useState('alpha-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(40);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let params = {};
        if (selectedDepartment) {
          params = { department: selectedDepartment };
        }
        if (selectedGenre) {
          params.genre = selectedGenre;
        }

        const response = await axios.get('http://localhost:4001/book', {
          params,
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [selectedDepartment, selectedGenre]);

  const uniqueDepartments = [...new Set(books.map(book => book.department))];
  const uniqueGenres = [...new Set(books.map(book => book.genre))];

  const filteredBooks = books.filter((book) => {
    return (
      (!selectedDepartment || book.department === selectedDepartment) &&
      (!selectedGenre || book.genre === selectedGenre)
    );
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === 'count-asc') {
      return a.count - b.count;
    } else if (sortOrder === 'count-desc') {
      return b.count - a.count;
    } else if (sortOrder === 'alpha-asc') {
      const titleA = a.title || '';  
      const titleB = b.title || '';  
      return titleA.localeCompare(titleB);
    } else if (sortOrder === 'alpha-desc') {
      const titleA = a.title || '';  
      const titleB = b.title || '';  
      return titleB.localeCompare(titleA);
    } else {
      return 0;
    }
  });
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  return (
    <>
      <Navbar />
      <div className='body'>
        <h1 className='title'>All Books</h1>
        <div className='sort-container'>
          <label>
            Sort by:
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={`bg-[#ffffff] dark:bg-gray-800 text-gray-800 dark:text-white border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500`}
            >
              <option value='count-asc'>Count Ascending</option>
              <option value='count-desc'>Count Descending</option>
              <option value='alpha-asc'>Alphabetical Ascending</option>
              <option value='alpha-desc'>Alphabetical Descending</option>
            </select>
          </label>
          <label>
            Books per page:
            <select className="dark:bg-gray-800"
              value={booksPerPage}
              onChange={(e) => setBooksPerPage(parseInt(e.target.value, 10))}
            >
              <option  value={10}>10</option>
              <option value={20}>20</option>
              <option value={40}>40</option>
              <option value={60}>60</option>
              <option value={80}>80</option>
              <option value={120}>120</option>
            </select>
          </label>
        </div>
        <div className='all-main-content'>
          <div className='filter-sidebar'>
            {/* Department dropdown */}
            <label>
              Department:
              <select className="dark:bg-gray-800"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value=''>All Departments</option>
                {uniqueDepartments.map((department) => (
                  <option key={department._id} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </label>

            {/* Genre dropdown */}
            <label>
              Genre:
              <select className="dark:bg-gray-800"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value=''>All Genres</option>
                {uniqueGenres.map((genre) => (
                  <option key={genre._id} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='book-grid-container'>
            {sortedBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage).map((item) => (
              <Bookcard item={item} key={item._id} />
            ))}
          </div>
        </div>
        <div className='pagination'>
          <button
            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllBooks;

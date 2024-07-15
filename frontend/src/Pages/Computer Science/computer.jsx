import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import "./computer.css";
import Bookcard from '../../Components/Bookcard/Bookcard';
import Footer from "../../Components/Footer/Footer";

function Computer() {
  const branch = "Computer Science";

  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        const data = res.data.filter((data) => data.department === branch);
        setBooks(data);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getBooks();
  }, [branch]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-[#ffffff] dark:bg-[#04060B] dark:text-[#ffffff]">
        <div className="flex-grow max-w-screen-2xl container mx-auto md:px-20 px-6 py-32">
          <h1 className="text-4xl font-semibold">Computer Science</h1>
          <div className="book-grid-container">
            {books.map((item) => (
              <Bookcard item={item} key={item.id} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Computer;

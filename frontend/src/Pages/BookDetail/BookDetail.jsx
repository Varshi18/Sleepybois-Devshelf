import React, { useState, useEffect } from "react";
import "./BookDetail.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Similar from "../../Components/Similar/Similar";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import toast from "react-hot-toast";

const BookDetail = () => {
  const { _id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        console.log("Fetching book with ID:", _id);
        const response = await axios.get(`http://localhost:4001/book/${_id}`);
        console.log("Book data:", response.data);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Failed to fetch book data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, [_id]);

  const handleBorrow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('Users'));
      const userIdRaw = user._id;
      const userInfo = { userId: userIdRaw };
      console.log("this is id data:", userInfo);
      await axios.post(`http://localhost:4001/user/borrow/${_id}`, userInfo)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            toast.success("Book borrowed Successfully");
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error);
            toast.error("Error: " + error.response.data.message);
          }
        });
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("Failed to borrow book. Please try again later.");
    }
  };


  const handleReturn = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('Users'));
      const userIdRaw = user._id;
      const userInfo = { userId: userIdRaw };
      console.log("this is id data:", userInfo);
      await axios.post(`http://localhost:4001/user/returnBook/${_id}`, userInfo)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            toast.success("Book returned Successfully");
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error);
            toast.error("Error: " + error.response.data.message);
          }
        });
    } catch (error) {
      console.error("Error returning book:", error);
      toast.error("Failed to return book. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="dark:bg-[#04060B]">
        <Navbar />
        <div className="body">
          <div className="book-detail-container">
            <div className="image">
              <img src={book.image} alt={book.title} />
            </div>
            <div className="book-detail-info">
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>{book.description}</p>
            </div>
            <div className="book-actions">
              <button onClick={handleBorrow} className="btn btn-primary">
                Borrow
              </button>
              <button onClick={handleReturn} className="btn btn-secondary">
                Return
              </button>
              <a href="#" className="btn btn-info">
                I'm Interested
              </a>
            </div>
          </div>
          <div className="More-Books">
            <Similar department={book.department} currentBookId={book._id} />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default BookDetail;

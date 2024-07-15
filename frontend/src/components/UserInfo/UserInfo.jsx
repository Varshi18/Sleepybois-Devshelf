import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../../context/AuthProvider";
import UserProfile from "../UserProfile/UserProfile";
import "./UserInfo.css";
import axios from "axios";
import picture from "../../../public/user light.jpg";
import BookList from "../BookList/BookList";

function UserInfo() {
  const [authUser] = useAuth();
  const [user, setUser] = useState(null);
  const [book1, setBook1] = useState(null);
  const [book2, setBook2] = useState(null);
  const [book3, setBook3] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userIdRaw = JSON.parse(localStorage.getItem("Users"));
        if (userIdRaw && userIdRaw._id) {
          const userId = { userId: userIdRaw._id };
          const userRaw = await axios.post("http://localhost:4001/user/userInfo", userId);
          const userData = userRaw.data;
          setUser(userData);

          
          if (userData.book1) {
            const book1Raw = await axios.post("http://localhost:4001/book/bookInfo", { bookId: userData.book1 });
            setBook1(book1Raw.data);
          } else {
            console.error("No Book1 ID found for user");
          }

          
          setTimeout(async () => {
            if (userData.book2) {
              const book2Raw = await axios.post("http://localhost:4001/book/bookInfo", { bookId: userData.book2 });
              setBook2(book2Raw.data);
            } else {
              console.log("Book2 not issued");
            }
          }, 100); 

          
          setTimeout(async () => {
            if (userData.book3) {
              const book3Raw = await axios.post("http://localhost:4001/book/bookInfo", { bookId: userData.book3 });
              setBook3(book3Raw.data);
            } else {
              console.log("Book3 not issued");
            }
          }, 300); 
        } else {
          console.error("No user found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);



  useEffect(() => {
    const initialBooks = [
      book1 && {
        id: 1,
        title: book1.title,
        issueDate: user.book1Date,
        returnDate: new Date(new Date(user.book1Date).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        image: book1.image,
      },
      book2 && {
        id: 2,
        title: book2.title,
        issueDate: user.book2Date,
        returnDate: new Date(new Date(user.book2Date).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        image: book2.image,
      },
      book3 && {
        id: 3,
        title: book3.title,
        issueDate: user.book3Date,
        returnDate: new Date(new Date(user.book3Date).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        image: book3.image,
      },
    ].filter(Boolean); // Filters out null or undefined values
  
    setBooks(initialBooks);
  }, [book1, book2, book3, user]);

  const handleIssueDateChange = (id, newIssueDate) => {
    const updatedBooks = books.map(book => {
      if (book.id === id) {
        const issueDate = newIssueDate === "Not Issued" ? "Not Issued" : new Date(newIssueDate).toISOString();
        const returnDate = newIssueDate === "Not Issued" ? null : new Date(new Date(newIssueDate).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString();
        return { ...book, issueDate, returnDate };
      }
      return book;
    });
    setBooks(updatedBooks);
  };
  

  return (
    <>
    <div className="h-screen bg-[#ffffff] dark:bg-[#04060B]">
      <Navbar />
      <div className="flex pt-16 flex-col lg:flex-row p-5 lg:space-x-8 lg:pt-12">
        <div className="flex flex-col w-full lg:w-1/2 mb-8 lg:mb-0">
          {user && (
            <UserProfile
              profilePic={picture}
              username={user.username}
              email={user.email}
            />
          )}
        </div>
        <div className="w-full">
          <BookList title="Books Borrowed" books={books} onIssueDateChange={handleIssueDateChange} />
        </div>
      </div>
      </div>
    </>
  );
}

export default UserInfo;

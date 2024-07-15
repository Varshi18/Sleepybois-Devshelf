import React, { useState } from "react";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import UserDetails from "../../Components/UserDetails/UserDetails";
import AddBookForm from "../../Components/AddBookForm/AddBookForm";
import BookList from "../../Components/BookList/BookListAdmin";
import './Admin.css';


const Admin = () => {
  const [activeSection, setActiveSection] = useState("userDetails");

  return (
    <>
    <Navbar />
    <div className="admin-container">
      <aside className="sidebar bg-[#482958] dark:bg-[#2B1834]">
        <div className="sidebar-header">Admin Dashboard</div>
        <nav className="sidebar-nav">
          <ul>
            <li
              className={activeSection === "userDetails" ? "active" : ""}
              onClick={() => setActiveSection("userDetails")}
            >
              User Details
            </li>
            <li
              className={activeSection === "addBook" ? "active" : ""}
              onClick={() => setActiveSection("addBook")}
            >
              Add Books
            </li>
            <li
              className={activeSection === "bookList" ? "active" : ""}
              onClick={() => setActiveSection("bookList")}
            >
              Book List
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content dark:bg-[#04060B]">
        {activeSection === "userDetails" && <UserDetails />}
        {activeSection === "addBook" && <AddBookForm />}
        {activeSection === "bookList" && <BookList />}
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default Admin;
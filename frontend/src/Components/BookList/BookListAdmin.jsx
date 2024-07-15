import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookListAdmin.css";
import { useAuth } from "../../context/AuthProvider";

const BookList = () => {
  const [authUser, setAuthUser] = useAuth();
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [newBookData, setNewBookData] = useState({
    title: "",
    description: "",
    author: "",
    genre: "",
    department: "",
    count: 0,
    image: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4001/admin/books", {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        });
        console.log("Books fetched:", response.data);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };

    fetchBooks();
  }, [authUser.token]);

  const handleEdit = (book) => {
    console.log("Editing book:", book);
    setEditingBook(book);
    setNewBookData({
      title: book.title || "",
      description: book.description || "",
      author: book.author || "",
      genre: book.genre || "",
      department: book.department || "",
      count: book.count || 0,
      image: book.image || "",
    });
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:4001/admin/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  const handleSave = async () => {
    console.log("Saving book:", editingBook);
    console.log("New book data:", newBookData);
    try {
      const response = await axios.put(
        `http://localhost:4001/admin/books/${editingBook._id}`,
        newBookData,
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      setBooks(
        books.map((book) =>
          book._id === editingBook._id ? response.data : book
        )
      );
      setEditingBook(null);
      setNewBookData({
        title: "",
        description: "",
        author: "",
        genre: "",
        department: "",
        count: 0,
        image: "",
      });
    } catch (error) {
      console.error("Error updating book", error);
    }
  };

  const handleClose = () => {
    setEditingBook(null);
    setNewBookData({
      title: "",
      description: "",
      author: "",
      genre: "",
      department: "",
      count: 0,
      image: "",
    });
  };

  return (
    <div className="book-list-container">
      <h2 className="book-list-title">Book List</h2>
      <table className="book-table ">
        <thead className= "bg-neutral-400 dark:bg-slate-600">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Department</th>
            <th>Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.department}</td>
                <td>{book.count}</td>
                <td className="actions">
                  <button className="pagination-button" onClick={() => handleEdit(book)}>Edit</button>
                  <button className="pagination-button" onClick={() => handleDelete(book._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No books available</td>
            </tr>
          )}
        </tbody>
      </table>

      {editingBook && (
        <div className="modal-wrapper">
          <div className="modal-content bg-[#fefefe] dark:bg-gray-800">
            <span className="modal-close" onClick={handleClose}>
              &times;
            </span>
            <h3 className="text-xl">Edit Book</h3>
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newBookData.title}
                  onChange={(e) =>
                    setNewBookData({ ...newBookData, title: e.target.value })
                  }
                  className="form-input dark:text-[#000000] dark:bg-gray-300"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={newBookData.description}
                  onChange={(e) =>
                    setNewBookData({
                      ...newBookData,
                      description: e.target.value,
                    })
                  }
                  className="form-input dark:text-[#000000] dark:bg-gray-300"
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  value={newBookData.author}
                  onChange={(e) =>
                    setNewBookData({ ...newBookData, author: e.target.value })
                  }
                  className="form-input dark:text-[#000000] dark:bg-gray-300"
                />
              </div>
              <div className="form-group">
                <label>Genre</label>
                <input
                  type="text"
                  value={newBookData.genre}
                  onChange={(e) =>
                    setNewBookData({ ...newBookData, genre: e.target.value })
                  }
                  className="form-input dark:text-[#000000] dark:bg-gray-300"
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={newBookData.department}
                  onChange={(e) =>
                    setNewBookData({
                      ...newBookData,
                      department: e.target.value,
                    })
                  }
                  className="form-input dark:text-[#000000] dark:bg-gray-300"
                />
              </div>
              <div className="form-group">
                <label>Count</label>
                <input
                  type="number"
                  value={newBookData.count}
                  onChange={(e) =>
                    setNewBookData({ ...newBookData, count: parseInt(e.target.value) })
                  }
                  className="form-input dark:text-[#000000] dark:bg-gray-300"
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={newBookData.image}
                  onChange={(e) =>
                    setNewBookData({ ...newBookData, image: e.target.value })
                  }
                  className="form-input dark:text-[#000000] dark:bg-gray-300"
                />
              </div>
              <div className="image-preview-container">
                {newBookData.image && (
                  <img src={newBookData.image} alt="Book Cover" className="image-preview" />
                )}
              </div>
              <button type="button" onClick={handleSave} className="form-button">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;

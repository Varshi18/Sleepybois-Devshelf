import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./AddBookForm.css";

const AddBookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [department, setDepartment] = useState("");
  const [count, setCount] = useState(0);
  const [image, setImage] = useState("");
  const [fileData, setFileData] = useState(null); // State to store parsed file data
  const [imageUrlPreview, setImageUrlPreview] = useState(''); // State for image preview

  const handleAddBook = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!title || !description || !author || !genre || !department || count === 0) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4001/admin/books", {
        title,
        description,
        author,
        genre,
        department,
        count,
        image,
      });
      console.log("Book added", response.data);
      onBookAdded(response.data); // Notify parent component about the new book
      toast.success("Book added successfully!");

      // Reset form fields
      setTitle("");
      setDescription("");
      setAuthor("");
      setGenre("");
      setDepartment("");
      setCount(0);
      setImage("");
      setFileData(null); // Clear file data
      setImageUrlPreview(''); // Clear image preview
    } catch (error) {
      console.error("Error adding book", error);
      toast.error("Failed to add book. Please try again later.");
    }
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setImage(url);
    setImageUrlPreview(url); // Set image preview URL
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      const fileType = selectedFile.name.split('.').pop().toLowerCase();

      if (fileType === 'json') {
        try {
          const data = JSON.parse(fileContent);
          setFileData(data); // Store parsed data
        } catch (error) {
          toast.error("Invalid JSON file.");
        }
      } else if (fileType === 'csv') {
        const rows = fileContent.split('\n');
        const headers = rows[0].split(',').map(header => header.trim());
        const data = rows.slice(1).map(row => {
          const values = row.split(',').map(value => value.trim());
          return headers.reduce((acc, header, index) => {
            acc[header] = values[index];
            return acc;
          }, {});
        });
        setFileData(data); // Store parsed data
      } else {
        toast.error("Invalid file type. Please upload a JSON or CSV file.");
      }
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="add-book bg-[#f9f9f9] border-[#dddddd] dark:bg-gray-800 dark:border-[#000000]">
      <h2 className="title">Add Book</h2>
      <form onSubmit={handleAddBook} className="form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input dark:text-[#000000] dark:bg-gray-300"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input dark:text-[#000000] dark:bg-gray-300"
            required
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-input dark:text-[#000000] dark:bg-gray-300"
            required
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="form-input dark:text-[#000000] dark:bg-gray-300"
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="form-input dark:text-[#000000] dark:bg-gray-300"
            required
          />
        </div>
        <div className="form-group">
          <label>Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="form-input dark:text-[#000000] dark:bg-gray-300"
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={handleImageChange}
            className="form-input dark:text-[#000000] dark:bg-gray-300"
          />
        </div>
        <div className="form-group image-preview">
          {imageUrlPreview && (
            <img src={imageUrlPreview} alt="Image Preview" />
          )}
        </div>
        <div className="form-group">
          <input
            type="file"
            accept=".json, .csv"
            onChange={handleFileChange}
            className="file-input"
            id="file-upload" // Added ID for association with label
          />
          <label htmlFor="file-upload" className="file-label">Upload JSON/CSV</label>
        </div>
        <button type="submit" className="form-button">
          Add Book
        </button>
      </form>

      {/* File Data Preview */}
      {fileData && (
        <div className="file-preview">
          <h3>File Preview</h3>
          <pre>{JSON.stringify(fileData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AddBookForm;

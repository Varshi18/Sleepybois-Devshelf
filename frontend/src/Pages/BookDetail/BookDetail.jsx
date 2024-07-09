import React, { useState, useEffect } from 'react';
import './BookDetail.css';
import axios from "axios";
import Recommended from '../../components/Recommended/Recommended';
import { useParams } from 'react-router-dom';
import Similar from '../../components/Similar/Similar';

const BookDetail = () => {
    const { _id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null); // Initialize book state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const getBook = async () => {
            try {
                console.log('Fetching book with ID:', _id); // Log the book ID
                const response = await axios.get(`http://localhost:4001/book/${_id}`);
                console.log('Book data:', response.data); // Log the book data
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
                setError('Failed to fetch book data. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        getBook();
    }, [_id]); // Fetch book data when the ID changes

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
    }

    if (error) {
        return <div>{error}</div>; // Show error message if there's an error
    }

    return (
        <div className="body">
            <div className="book-detail-container">
                <div className='image'>
                    <img src={book.image} alt={book.title} />
                </div>
                <div className="book-detail-info">
                    <h2>{book.title}</h2>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>{book.description}</p>
                </div>
                <div className="book-actions">
                    <a href="#" className="btn btn-primary">Borrow</a>
                    <a href="#" className="btn btn-secondary">Return</a>
                    <a href="#" className="btn btn-info">I'm Interested</a>
                </div>
            </div>
            <div className="More-Books">
                    <Similar department={book.department} currentBookId={book._id}/>
            </div>
        </div>
    );
}

export default BookDetail;

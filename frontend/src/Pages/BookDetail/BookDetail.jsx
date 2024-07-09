import React, { useState, useEffect } from 'react';
import './BookDetail.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Similar from '../../components/Similar/Similar';

const BookDetail = () => {
    const { _id } = useParams(); 
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getBook = async () => {
            try {
                console.log('Fetching book with ID:', _id);
                const response = await axios.get(`http://localhost:4001/book/${_id}`);
                console.log('Book data:', response.data);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
                setError('Failed to fetch book data. Please try again later.');
            } finally {
                setLoading(false); 
            }
        };

        getBook();
    }, [_id]); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
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

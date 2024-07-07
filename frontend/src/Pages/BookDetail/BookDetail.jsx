import React from 'react';
import './BookDetail.css';
import Recommended from '../../components/Recommended/Recommended';


const BookDetail = () => {
    return (
        <div className="body">
            <div className="book-detail-container">
                <div className="book-card">
                    <img src="https://th.bing.com/th/id/OIP.yG_pQCdDqgmJrpBWhYPKTQAAAA?rs=1&pid=ImgDetMain" className="card-img-top" alt="Book Image"/>
                    <div className="card-body">
                        <h5 className="card-title">Book Name</h5>
                        <p className="card-text">Brief Description</p>
                    </div>
                </div>
                <div className="book-detail-info">
                    <h2>Book Name</h2>
                    <p>Author: My Name Here</p>
                    <p>Genre: Non-Fiction</p>
                    <p>Published: 2024</p>
                    <p>Some thing about the book which may be required for some people</p>
                </div>
                <div className="book-actions">
                    <a href="#" className="btn btn-primary">Borrow</a>
                    <a href="#" className="btn btn-secondary">Return</a>
                    <a href="#" className="btn btn-info">I'm Interested</a>
                </div>
            </div>
            <div className="More-Books">
                <div className="book-list">
                    <Recommended/>
                </div>
                <h2 className="subhead">Similar Books</h2>
                <div className="book-list">
                    {Array(9).fill().map((_, idx) => (
                        <div key={idx} className="book-card">
                            <img src="https://m.media-amazon.com/images/I/41cb-WqyxqL._SY445_SX342_.jpg" alt={`Book ${idx + 1}`} />
                            <div className="card-body">
                                <h5 className="card-title">Book Name</h5>
                                <p className="card-text">Brief Description</p>
                                <a href="#" className="card-button">More</a>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default BookDetail;

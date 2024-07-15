import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Bookcard.css";
import { Link } from 'react-router-dom';

function Bookcard({item}) {
    if (!item || !item.title || !item.author) {
    return null; 
  }
    return (
            <>
            <div className="card">
                <div className="card-image-container">
                    <img src={item.image} className="card-img-top" alt={item.title}/>
                </div>
                <Link to={`/book-detail/${item._id}`}>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <a href={`/book-detail/${item._id}`} className="card-button">More</a>
                </div>
                </Link>
            </div>
            </>
    )
}

export default Bookcard
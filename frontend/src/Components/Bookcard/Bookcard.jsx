import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Bookcard.css';

const Bookcard = () => {
    return (
        <Link>
            <div className="card">
                <img src="https://th.bing.com/th/id/OIP.yG_pQCdDqgmJrpBWhYPKTQAAAA?rs=1&pid=ImgDetMain" className="card-img-top" alt="Book Image"/>
                <div className="card-body">
                    <h5 className="card-title">Book Name</h5>
                    <p className="card-text">Brief Description</p>
                    <a href="#" className="card-button">More</a>
                </div>
            </div>
        </Link>
    )
}

export default Bookcard
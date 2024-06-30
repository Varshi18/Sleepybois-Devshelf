import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg shadow-sm" aria-label="Offcanvas navbar large">
    <div class="container-fluid">
      <a class="navbar-brand me-auto" href="#">Library</a>
      <div class="offcanvas offcanvas-end text" tabindex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbar2Label">Library</h5>
          <button type="button" class="btn-close btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body ms-2">
          <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">All Books</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Branches
              </a>
              <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Chemical Engineering</a></li>
            <li><a class="dropdown-item" href="#">Civil Engineering</a></li>
            <li><a class="dropdown-item" href="#">Computer Science</a></li>
            <li><a class="dropdown-item" href="#">Electrical Engineering</a></li>
            <li><a class="dropdown-item" href="#">Engineering Physics</a></li>
            <li><a class="dropdown-item" href="#">Mechanical Engineering</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">All Books</a></li>
          </ul>
            </li>
          </ul>
          <form class="d-flex mt-3 mt-lg-0 me-2" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
      <button class="btn btn-outline-success" type="submit">Login</button>
      <button class="navbar-toggler ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
  )
}

export default Header

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx'
import Authprovider from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Authprovider>
  <div className="dark:bg-slate-900 dark:text-white">
    <Navbar/>
    <App/>
    <Footer/>
  </div>
  </Authprovider>
  </BrowserRouter>
    

)

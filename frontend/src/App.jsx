import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home';
import Footer from './Components/Footer/Footer';
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App

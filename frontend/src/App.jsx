import React from 'react'
import AllBooks from './Pages/All Books/AllBooks'
import Home from './Pages/home/Home'
import { Navigate, Route, Routes } from "react-router-dom"
import Signup from './Pages/Signup/Signup'
import { Toaster } from 'react-hot-toast';
import BookDetail from './Pages/BookDetail/BookDetail'
import { useAuth } from './context/AuthProvider'
import UserInfo from './Components/UserInfo/UserInfo'
import Computer from './Pages/Computer Science/Computer'
import Electrical from './Pages/Electrical/Electrical'
import Mechanical from './Pages/Mechanical/Mechanical'
import Admin from './Pages/Admin/Admin'
import SearchResult from './Pages/SearchResult/SearchResult'

function App() {
  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      <div className="dark:bg-[#04060B] dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allBooks" element={<AllBooks />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/computer" element={<Computer />} />
          <Route path="/electrical" element={<Electrical />} />
          <Route path="/mechanical" element={<Mechanical />} />
          <Route path="/book-detail/:_id" element={<BookDetail />} />
          <Route path="/search/:keyword" element={<SearchResult />}/>
          <Route path="/User" element={authUser ? <UserInfo /> : <Navigate to="/" />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute user={authUser} adminOnly={true}>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

const PrivateRoute = ({ children, user, adminOnly }) => {
  if (!user) {
    return <Navigate to="/" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default App;

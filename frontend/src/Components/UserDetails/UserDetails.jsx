import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import './UserDetails.css';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [authUser, setAuthUser] = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4001/admin/users", {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, [authUser.token]);

  // Function to render books and their dates
  const renderBooks = (user) => {
    const books = [];
    for (let i = 1; i <= 3; i++) { // Assuming up to book3 based on your example
      const bookKey = `book${i}`;
      const dateKey = `book${i}Date`;
      if (user[bookKey]) {
        books.push(
          <div key={bookKey}>
            <strong>{bookKey}:</strong> {user[bookKey]} <br />
            <strong>{dateKey}:</strong> {user[dateKey]} <br />
          </div>
        );
      }
    }
    return books;
  };

  return (
    <div className="admin-user-details bg-[#f9f9f9] dark:bg-gray-800">
      <h2 className="admin-user-title">User Details</h2>
      <div className="table-container">
        <table className="user-table border-[#000000] dark:bg-[#04060B]">
          <thead className=" bg-neutral-400 dark:bg-slate-600">
            <tr>
              <th>email</th>
              <th>Books</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{renderBooks(user)}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;

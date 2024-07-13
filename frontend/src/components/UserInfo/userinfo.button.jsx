import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";

function userinfoButton() {
  const [authUser, setAuthUser] = useAuth();
  const handleLogoutClick = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Users");
      toast.success("Logout Successful");

      setTimeout(() => {
        window.location.reload();
      }, 900);
    } catch (error) {
      toast.error("Error:" + error.message);
      setTimeout(() => {}, 1000);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/User");
  };

  const theme = localStorage.getItem("theme") || "light";
  
  return (
    <div>
      {location.pathname === "/User" ? (
        <button
          className="flex items-center justify-center bg-red-500 text-white cursor-pointer px-3 py-2 rounded-md"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      ) : (
        <button
          className="flex items-center justify-center bg-gray-200 rounded-full cursor-pointer"
          onClick={handleLoginClick}
        >
          <img
            src={
              theme === "dark"
                ? "../../../public/user dark.png"
                : "../../../public/user light.jpg"
            }
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        </button>
      )}
    </div>
  );
}

export default userinfoButton;

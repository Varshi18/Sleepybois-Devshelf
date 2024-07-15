
import React from 'react';
import './UserProfile.css';

const UserProfile = ({ profilePic, username, email }) => {
  return (
    <div className=" mt-16 flex flex-col items-center text-center bg-[#ffffff] dark:bg-slate-900 p-6 rounded-lg shadow-md lg:p-10">
      <img src={profilePic} alt="Profile" className="w-24 h-24 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-full border-4 border-green-500" />
      <div className="mt-4 text-gray-800">
        <h2 className="text-lg lg:text-xl xl:text-2xl text-green-500">{username}</h2>
        <p className="text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-200">{email}</p>
      </div>
    </div>
  );
};

export default UserProfile;

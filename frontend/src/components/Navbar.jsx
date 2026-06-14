import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <div className="flex justify-between items-center py-4 px-8 bg-green-300 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800"> Task Manager</h2>
      <div className="flex gap-6 items-center font-semibold text-gray-700">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <div className="flex justify-between gap-6">
            <Link to="/profile">Profile</Link>
           <button onClick={logout} className="cursor-pointer">Logout</button>
          </div>
         
          
        ) : (
          <div className="flex justify-between gap-6">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default Navbar;

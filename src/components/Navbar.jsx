import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">SOP Generator</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white">Home</Link>
          {!token ? (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-white">Dashboard</Link>
              <button onClick={handleLogout} className="text-white">Logout</button>
              <Link to="/sop-form" className="mx-2">Generate SOP</Link>

            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

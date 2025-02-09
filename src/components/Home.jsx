import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to SOP Generator</h1>
      <p className="mb-6">Easily generate your Statement of Purpose (SOP) with just a few clicks.</p>
      <div className="space-x-4">
        <Link to="/register" className="bg-green-500 text-white py-2 px-4 rounded">Register</Link>
        <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded">Login</Link>
      </div>
    </div>
  );
};

export default Home;

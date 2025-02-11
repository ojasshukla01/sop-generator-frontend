import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-6">
        <nav className="flex justify-between items-center bg-blue-500 text-white p-4 rounded">
          <Link to="/" className="text-lg font-bold hover:text-gray-300 transition">Home</Link>
          <div className="flex space-x-4">
            <Link to="/register" className="hover:text-gray-300 transition">Register</Link>
            <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
            <Link to="/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>
          </div>
        </nav>

        <div className="mt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="text-center mt-10">
      <h2 className="text-4xl font-bold text-gray-800">Welcome to SOP Generator</h2>
      <p className="text-gray-600 mt-4">Easily generate and manage your SOPs.</p>
      <div className="mt-6">
        <Link to="/register" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mr-4">
          Get Started
        </Link>
        <Link to="/login" className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
          Login
        </Link>
      </div>
    </div>
  );
}

export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

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

export default App;

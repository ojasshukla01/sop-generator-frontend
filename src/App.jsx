import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div>
        <nav className="p-4 bg-gray-800 text-white">
          <Link to="/" className="mr-4">Home</Link>
          {!isAuthenticated ? (
            <Link to="/login" className="mr-4">Login</Link>
          ) : (
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

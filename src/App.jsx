import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to fetch user info", error);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setShowUserMenu(false);
  };

  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-lg font-bold">SOP Generator</Link>
          <div className="flex items-center">
            <Link to="/" className="mx-2">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="mx-2">Dashboard</Link>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-full"
                  >
                    {username.charAt(0).toUpperCase()}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                      <button onClick={handleLogout} className="block px-4 py-2 text-red-500 hover:bg-gray-200">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="mx-2">Login</Link>
                <Link to="/register" className="mx-2">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={fetchUserInfo} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

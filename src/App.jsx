import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true); // To handle page loading

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token);
    } else {
      setLoading(false); // Page loading ends if no token
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch("http://localhost:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setIsAuthenticated(true);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUsername("");
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>; // Show a loading indicator
  }

  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-lg font-bold">SOP Generator</Link>
          <div className="flex items-center">
            <Link to="/" className="mx-2">Home</Link>
            {isAuthenticated ? (
              <div className="relative inline-block">
                <button
                  onClick={() => document.getElementById("user-dropdown").classList.toggle("hidden")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                  {username.charAt(0).toUpperCase()}
                </button>
                <div id="user-dropdown" className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg hidden">
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</Link>
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
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
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={() => fetchUserInfo(localStorage.getItem("token"))} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

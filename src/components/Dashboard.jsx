import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {loading ? (
        <p>Loading user information...</p>
      ) : userInfo ? (
        <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl mb-2">Welcome, <strong>{userInfo.username}</strong>!</h2>
          <p className="text-gray-700">Email: {userInfo.email}</p>
          
          <div className="mt-6">
            <Link to="/sop-form">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Generate SOP
              </button>
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default Dashboard;

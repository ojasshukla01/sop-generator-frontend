import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(response.data);
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile Info</h1>
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
    </div>
  );
}

export default Profile;

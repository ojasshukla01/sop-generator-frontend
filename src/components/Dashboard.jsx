import React from "react";

const Dashboard = () => {
  return (
    <div className="container mx-auto text-center mt-10">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <p className="mt-4">This is a protected page visible only to logged-in users.</p>
    </div>
  );
};

export default Dashboard;

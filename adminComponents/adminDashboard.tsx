import React from "react";

const AdminDashboard = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-2xl font-semibold h-1/6">Dashboard</h2>
      <div className="flex flex-col items-center h-5/6 w-full gap-4">
        <div className="h-1/2 bg-gray-400">Total Students : 766</div>
        <div>Total Teachers :200</div>
      </div>
    </div>
  );
};

export default AdminDashboard;

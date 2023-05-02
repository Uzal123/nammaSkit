import React from "react";

const AdminDashboard = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-2xl font-semibold h-1/6">Dashboard</h2>
      <div className="grid  gap-4 p-4 grid-cols-4 mt-4">
        <div className="flex flex-col justify-center bg-gray-600  items-center rounded-lg shadow-lg p-6 m-4 text-white">
          <h3 className="text-xl font-semibold">Total Students</h3>
          <p className="text-3xl font-bold">100</p>
        </div>
        <div className="flex flex-col justify-center items-center text-white bg-gray-600 rounded-lg shadow-lg p-6 m-4">
          <h3 className="text-xl font-semibold">Total Teachers</h3>
          <p className="text-3xl font-bold">100</p>
        </div>
        <div className="flex flex-col justify-center items-center text-white bg-gray-600 rounded-lg shadow-lg p-6 m-4">
          <h3 className="text-xl font-semibold">Total Departments</h3>
          <p className="text-3xl font-bold">100</p>
        </div>
        <div className="flex flex-col justify-center items-center text-white bg-gray-600 rounded-lg shadow-lg p-6 m-4">
          <h3 className="text-xl font-semibold">Total Courses</h3>
          <p className="text-3xl font-bold">100</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

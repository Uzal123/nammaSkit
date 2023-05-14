import React from "react";
import AppLayout from "../../layouts/applayout";

const Attendance = () => {
  return (
    <AppLayout>
      <div className=" rounded-md w-full h-full bg-gray-100">
        <div className="flex flex-col w-full justify-center px-10 p-4">
          <div className="flex justify-between">
            <p className="font-semibold text-lg">Results Management</p>
          </div>
        </div>
        <div className="px-10 w-full">
          <div className="flex gap-4">
            <form className="flex flex-col gap-4 bg-white rounded-md p-4 w-1/3">
              <p className="font-semibold text-lg">
                Search for results with USN
              </p>
              <input type="text" className="border-2 w-full p-2 rounded-md" />
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Search
              </button>
            </form>
            <div className="flex flex-col gap-4 bg-white p-6 items-center justify-center">
              <p className="font-semibold text-lg">
                Upload Class Result from Excel
              </p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Upload
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold text-lg py-3">Students</p>
          </div>
          {/* <StudentsTable students={data?.getAllStudents} isLoading={loading} /> */}
        </div>
      </div>
    </AppLayout>
  );
};

export default Attendance;

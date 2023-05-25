import React from "react";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <div>{children}</div>
    </div>
  );
};

export default StudentLayout;

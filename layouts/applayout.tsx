import React from "react";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Navbar />
      <div>
        <Topbar />
        <div className="main-container">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;

import React from "react";
import Navlink from "./navlink";
import { RxDashboard } from "react-icons/rx";
import { HiUsers } from "react-icons/hi";
import { GiNotebook } from "react-icons/gi";
import { RiSettings4Fill } from "react-icons/ri";
import { ImLanyrd } from "react-icons/im";
import { useUserStore } from "../store/auth";

const Navbar: React.FC = () => {
  const { user } = useUserStore();
  return (
    <div className="navbar">
      <ul className="flex flex-col w-full h-full p-4 pt-10 gap-2 items-center text-lg font-semibold bg-gray-800">
        <p className="text-2xl text-white py-4">Namma Skit</p>
        <Navlink exact href={"/"}>
          <RxDashboard />
          Dashboard
        </Navlink>
        {user.role === ("ad" || "hod") && (
          <Navlink exact href={"/users"}>
            <HiUsers />
            Users
          </Navlink>
        )}
        {user.role === ("ad" || "hod") && (
          <Navlink exact href={"/courses"}>
            <GiNotebook />
            Courses
          </Navlink>
        )}

        {user.role === ("pr" || "fa") && (
          <Navlink exact href={"/users"}>
            <HiUsers />
            My Students
          </Navlink>
        )}

        <Navlink exact href={"/settings"}>
          <RiSettings4Fill />
          Settings
        </Navlink>
        <Navlink exact href={"/any"}>
          <ImLanyrd /> Any
        </Navlink>
      </ul>
    </div>
  );
};

export default Navbar;

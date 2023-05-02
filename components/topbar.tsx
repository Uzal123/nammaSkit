import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useUserStore } from "../store/auth";
import { useRouter } from "next/router";
import { IoLogOutOutline } from "react-icons/io5";
import { useNotificationStore } from "../store/notification";
import { v4 as uuidv4 } from "uuid";
import { ROLES } from "../assets/roles";

const Topbar: React.FC = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const removeUser = useUserStore(
    (state: { removeUser: any }) => state.removeUser
  );

  const { setNotification } = useNotificationStore((state: any) => state);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="topbar flex">
      <div className="flex items-center w-5/6 h-full gap-3 px-8"></div>
      <div className="flex items-center">
        <div className="border-l-2 h-10"></div>
      </div>

      <div className="flex items-center gap-2 w-1/6 justify-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="rounded-full h-10 w-10 bg-gray-600"></div>
          <div>
            <p className="font-semibold">{user.firstName}</p>
            {user.role && <p className="text-xs">Role: {user.role}</p>}
          </div>
        </div>

        <BsChevronDown
          className="text-lg cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />
        {showMenu && (
          <div className="absolute top-12 right-0 bg-white w-32 h-32 rounded-md shadow-md">
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <p
                className="text-sm cursor-pointer"
                onClick={() => router.push(`/profile/${user.id}`)}
              >
                Profile
              </p>
              <p className="text-sm cursor-pointer">Settings</p>
              <p
                className="text-sm cursor-pointer hover:bg-red-600 w-full text-center p-2 hover:text-white flex items-center justify-center gap-2"
                onClick={() => {
                  removeUser();
                  setNotification({
                    id: uuidv4(),
                    message: "Logged out successfully",
                    status: "Error",
                    duration: 3000,
                  });
                  router.push("/login");
                }}
              >
                <IoLogOutOutline className="text-lg" />
                Logout
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;

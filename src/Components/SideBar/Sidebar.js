import React, { useState } from "react";
import { Sidenav, initTE } from "tw-elements";
import { AiFillHome } from "react-icons/ai";
import { SiPostman } from "react-icons/si";
import { GrUserManager } from "react-icons/gr";
import UserBox from "./UserBox";

initTE({ Sidenav });

function Sidebar() {
  const [active, setActive] = useState("home");

  const handleItemClick = (page) => {
    setActive(page);
  };

  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between w-72 px-2">
      <div>
        <div className="mt-1 mb-4 ml-1 flex items-center justify-center rounded-full w-16 h-16 hover:bg-gray-lightest">
          <SiPostman className="w-12 h-12" />
        </div>
        <nav className="flex-col mb-4 cursor-pointer">
          <ul className="text-xl group block">
            <a href="/">
              <li
                className={`mb-4 flex items-center hover:bg-primary-light group-hover:text-primary-base rounded-full pl-3 pr-8 py-3 ${
                  active === "home" ? "bg-primary-light text-primary-base" : ""
                }`}
                onClick={() => handleItemClick("home")}
              >
                <AiFillHome />

                <span className="ml-4 font-bold">Home</span>
              </li>
            </a>
            <a href="/profile">
              <li
                className={`mb-4 flex items-center hover:bg-primary-light group-hover:text-primary-base rounded-full pl-3 pr-8 py-3 ${
                  active === "profile"
                    ? "bg-primary-light text-primary-base"
                    : ""
                }`}
                onClick={() => handleItemClick("profile")}
              >
                <GrUserManager />

                <span className="ml-4 font-bold">Profile</span>
              </li>
            </a>
          </ul>
        </nav>
        <button className="bg-primary-base text-white rounded-full py-3 px-8 w-11/12 shadow-lg hover:bg-primary-dark transform transition-colors duration-200">
          Tweet
        </button>
      </div>
      <UserBox />
    </div>
  );
}

export default Sidebar;

import React, { useContext, useState, useRef, useEffect } from "react";
import { userContext } from "../../App.js";
import { navigate } from "@reach/router";

function UserBox({ handleLogout }) {
  const { user } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogoutClick = () => {
    handleLogout();
    console.log("LOGOUT");
    navigate("/auth/login");
  };
  console.log(typeof handleLogout);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex  w-max h-max justify-between items-center mb-6 hover:bg-primary-light cursor-pointer rounded-full py-2 px-4 transform transition-colors duratios-200"
        onClick={toggleMenu}
      >
        <img
          src="https://pbs.twimg.com/profile_images/1511974929562050561/xhw9tpIc_400x400.jpg"
          alt="Profile"
          className="w-11 h-11 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-bold text-md text-black-black ml-2">
            {user ? user.name : "Unknown User"}
          </span>
          <span className="text-sm text-gray-dark">
            @{user ? user.username : "unknown"}
          </span>
        </div>
        <div className="flex space-x-1 ml-3">
          <div className="w-1 h-1 bg-gray-900 rounded-full" />
          <div className="w-1 h-1 bg-gray-900 rounded-full" />
          <div className="w-1 h-1 bg-gray-900 rounded-full" />
        </div>
      </button>
      {isOpen && (
        <ul className=" absolute bg-transparent hover:bg-primary-light rounded-full px-4 shadow-xl p-4   right-0  -top-[80px]  mt-2">
          <li
            className="py-2 cursor-pointer w-40 h40  "
            onClick={handleLogoutClick}
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
}

export default UserBox;

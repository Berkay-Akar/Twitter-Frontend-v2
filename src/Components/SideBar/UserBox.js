import React, { useContext } from "react";
import { userContext } from "../../App.js";

function UserBox() {
  const { user } = useContext(userContext);

  return (
    <div className="flex justify-between items-center mb-6 hover:bg-primary-light cursor-pointer rounded-full py-2 px-4 transform transition-colors duratios-200">
      <img
        src="https://pbs.twimg.com/profile_images/1511974929562050561/xhw9tpIc_400x400.jpg"
        alt="Profile"
        className="w-11 h-11 rounded-full"
      />
      <div className="flex flex-col">
        <span className="font-bold text-md text-black-black">
          {user ? user.full_name : "Unknown User"}
        </span>
        <span className="text-sm text-gray-dark">
          @{user ? user.username : "unknown"}
        </span>
      </div>

      <div className="flex space-x-1">
        <div className="w-1 h-1 bg-gray-900 rounded-full" />
        <div className="w-1 h-1 bg-gray-900 rounded-full" />
        <div className="w-1 h-1 bg-gray-900 rounded-full" />
      </div>
    </div>
  );
}

export default UserBox;

import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Timeline, Tweet } from "react-twitter-widgets";

function Layout() {
  return (
    <aside className="w-80">
      <div className="flex items-center space-x-4 p-3 m-3 bg-gray-200 rounded-full text-gray-dark focus-within:bg-white focus-within:ring-1 focus-within:ring-primary-base focus-within:text-primary-base">
        <AiOutlineSearch className="w-5 h-5 " />
        <input
          type="text"
          placeholder="Search BerkAi"
          className="placeholder-gray-dark bg-transparent focus:outline-none outline-none w-full text-sm"
        />
      </div>
      <div className="mt-5 ">
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: "elonmusk",
          }}
          options={{
            height: "400",
          }}
        />
      </div>
    </aside>
  );
}

export default Layout;

import React, { useContext } from "react";
import { userContext } from "../../App";
import axios from "axios";

function FeedItem({ tweet }) {
  const { user } = useContext(userContext);

  return (
    <div>
      <article className="flex flex-col shadow my-4">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Profile"
          className="w-11 h-11 rounded-full"
        />
        <div className="flex flex-col items-start justify-between px-4 py-2 bg-white">
          <div className="flex items-center">
            <span className="font-bold text-md text-black-black">
              {user ? user.full_name : "Unknown User"}
            </span>
            <span className="text-sm text-gray-dark">
              @{user ? user.username : "unknown"}
            </span>
          </div>
          <p className="text-md text-black-black">{tweet.post_text}</p>
        </div>
      </article>
    </div>
  );
}

export default FeedItem;

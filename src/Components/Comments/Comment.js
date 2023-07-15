import axios from "axios";
import React, { useState, useContext, useEffect, useRef } from "react";
import { userContext } from "../../App";
import { AiOutlinePicture } from "react-icons/ai";

function Comment() {
  const [comment, setComment] = useState("");
  const { user } = useContext(userContext);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const handleVisible = () => {
    setVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section>
      <div className="flex items-center space-x-2 mb-3">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Profile"
          className="w-11 h-11 rounded-full ml-4 object-cover"
        />

        <input
          onClick={handleVisible}
          type="text"
          placeholder="Tweet your reply"
          className="bg-gray text-md text-black-black break-all font-bold text-md w-full focus:outline-none px-4 py-2 rounded-full"
        />
        {visible ? (
          <AiOutlinePicture className="w-6 h-6 text-primary-base rounded-full hover:bg-gray-lightest" />
        ) : null}

        <button className="bg-primary-base text-white rounded-full px-4 py-2 font-medium">
          Reply
        </button>
      </div>
    </section>
  );
}

export default Comment;

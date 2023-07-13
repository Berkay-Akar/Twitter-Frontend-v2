import React, { useContext, useEffect, useState } from "react";
import { WiStars } from "react-icons/wi";
import TweetBox from "../Tweet/TweetBox";
import Divider from "./Divider";
import FeedList from "../Tweet/FeedList";
import { userContext } from "../../App";
import axios from "axios";

function Main() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      if (!user) {
        return;
      }
      const response = await axios.get("http://localhost:3001/posts", {
        params: {
          id: user.id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("RESPONSE:", response);
      console.log("RESPONSE DATA:", response.data);
      setPosts(response.data.posts);
      console.log("FETCH USER", user);
      console.log("USER ID:", user.id);
    } catch (error) {
      console.log("Error fetching posts:", error.response.data.error);
    }
  };

  return (
    <main className="z-10 flex-1 flex flex-col border-r border-l border-gray-extraLight">
      <header className="sticky top-0 flex justify-between items-center p-4 border-b border-gray-extraLight bg-white">
        <span className="font-bold text-xl text-gray-900">Home</span>
        <WiStars className="w-6 h-6 text-primary-base" />
      </header>
      <div className="flex space-x-4 px-4 py-3">
        <img
          src="https://pbs.twimg.com/profile_images/1511974929562050561/xhw9tpIc_400x400.jpg"
          alt="Profile"
          className="w-11 h-11 rounded-full"
        />
        <TweetBox />
      </div>
      <Divider />
      <FeedList tweets={posts} />
    </main>
  );
}

export default Main;

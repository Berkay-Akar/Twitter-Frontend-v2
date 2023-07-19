import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { WiStars } from "react-icons/wi";
import { userContext } from "../../App";
import FeedList from "../Tweet/FeedList";
import TweetBox from "../Tweet/TweetBox";
import Divider from "./Divider";

function Main() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    fetchData();
    console.log("POSTS", posts);
  }, [user]);

  const fetchData = async () => {
    try {
      if (!user) {
        return;
      }
      const response = await axios.get("http://localhost:3001/tweets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("RESPONSE: ", response.data);
      if (!response.data.posts.length) return;
      setPosts(response.data.posts);
    } catch (error) {
      console.log("Error fetching posts:", error);
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
        <TweetBox posts={posts} setPosts={setPosts} />
      </div>
      <Divider />
      <FeedList posts={posts} setPosts={setPosts} />
    </main>
  );
}

export default Main;

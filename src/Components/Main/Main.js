import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { WiStars } from "react-icons/wi";
import { userContext } from "../../App";
import FeedList from "../Tweet/FeedList";
import TweetBox from "../Tweet/TweetBox";
import TweetDetail from "../Tweet/TweetDetail";
import Divider from "./Divider";

function Main() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(userContext);

  console.log("POST: ", posts);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      if (!user) {
        return;
      }
      const response = await axios.get("http://localhost:3001/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.data.posts.length) return;
      setPosts(response.data.posts);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  const sendTweet = (tweet) => {
    if (tweet.length === 0) {
      return;
    }
    try {
      axios
        .post(
          "http://localhost:3001/posts",
          {
            post_user: user.id,
            post_text: tweet,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("RES DATA:", res.data.post);
          setPosts([res.data.post, ...posts]);
        });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/posts/likes`,
        {
          id: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("RESPONSE:", response.data);
      if (!response.data) return;
      const updatedPosts = posts.map((post) => {
        if (post.post_id === postId) {
          post = response.data.post;
        }
        return post;
      });

      console.log("UPDATED POSTS:", updatedPosts);
      setPosts(updatedPosts);
    } catch (error) {}
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/posts`,
        {
          data: {
            id: postId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("RESPONSE:", response.data);
      if (!response.data) return;
      const updatedPosts = posts.filter((post) => {
        return post.post_id !== postId;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error deleting post:", error);
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
        <TweetBox sendTweet={sendTweet} />
      </div>
      <Divider />
      <FeedList tweets={posts} likePost={likePost} deletePost={deletePost} />
    </main>
  );
}

export default Main;

import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";
import Layout from "../Layout/Layout";
import FeedList from "../Tweet/FeedList";
import Divider from "../Main/Divider";
import ProfileTab from "./ProfileTab";
import FeedItem from "../Tweet/FeedItem";

function Profile() {
  const { user } = useContext(userContext);
  const [posts, setPosts] = useState([]);
  const [posts_user, setPosts_user] = useState(null);
  console.log("USER:", user);
  const date = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      if (!user) {
        return;
      }
      const response = await axios.get("http://localhost:3001/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.data.posts.length) return;
      const loggedInUser = response.data.posts.find(
        (post) => post.user.id === user.id
      );
      if (!loggedInUser) return;
      const posts = loggedInUser.user.posts;
      setPosts(posts);
      setPosts_user(loggedInUser.user.id);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-row min-h-screen max-w-7xl mx-auto border">
        <div className="w-72 flex-auto">
          <Sidebar />
        </div>

        <div className="w-full flex-auto">
          <div className="flex flex-col">
            <div className="relative pt-8 mb-8">
              <img
                className="w-full h-[200px] bg-black object-cover  rounded-lg "
                src="https://w.forfun.com/fetch/73/73432c82bb52c8e33f91872a0c2f3420.jpeg"
                alt=""
              />
              <img
                className="w-[100px] h-[100px] rounded-full border-2  absolute bottom-[-50px] left-[15px]"
                src="https://pbs.twimg.com/profile_images/1511974929562050561/xhw9tpIc_400x400.jpg"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-xl tracking-wider  pt-8 ">
                {user?.full_name}
              </h5>
              <span className="font-semibold text-sm text-gray-dark">
                @{user?.username}
              </span>

              <span>#aideveloper</span>
              <span>{date}</span>
              <div>
                <span>785 Takip edilen </span>
                <span>1502 Takipçi</span>
              </div>
            </div>

            <div>
              <ProfileTab />
            </div>
          </div>
          <Divider />
          {posts_user === user.id &&
            posts.map((post) => (
              <FeedItem
                key={post.id}
                tweet={post}
                posts={posts}
                user={post.user}
                setPosts={setPosts}
              />
            ))}
        </div>
        <div className="flex-auto">
          <Layout />
        </div>
      </div>
    </div>
  );
}

export default Profile;

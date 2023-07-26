import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";
import Layout from "../Layout/Layout";
import Divider from "../Main/Divider";
import ProfileTab from "./ProfileTab";
import FeedItem from "../Tweet/FeedItem";
import { useParams } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";

function Profile() {
  const [open, setOpen] = React.useState(false);
  const { username } = useParams();
  console.log("USERNAME:", username);

  const handleOpen = () => setOpen(!open);
  const { user } = useContext(userContext);
  console.log("USER:", user);
  const [posts, setPosts] = useState([]);
  const [posts_user, setPosts_user] = useState(null);
  console.log("USER:", user);
  const date = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile(username);
  }, [username]);

  const fetchUserProfile = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/profile/user/${username}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("USERNAME:", username);
      console.log("RESPONSE:", response);
      const posts = response.data.tweets;
      setPosts(posts);
      setPosts_user(response.data.tweets.user_id);
      setUser(response.data.tweets[0].user);
      console.log("posts_user:", posts_user);
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  console.log("PROFILE POSTS:", posts);

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
            <div className="flex flex-col gap-2 ">
              <div className="flex justify-between w-full">
                <h5 className="font-bold text-xl tracking-wider  pt-8 ">
                  {user?.name}
                </h5>

                <>
                  <Button onClick={handleOpen} className="mr-11 h-10">
                    Edit Profile
                  </Button>
                  <Dialog open={open} handler={handleOpen}>
                    <div className="flex items-center justify-between">
                      <DialogHeader>New message to @</DialogHeader>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={handleOpen}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 01-1.06-1.06L5.47 5.47a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <DialogBody divider>
                      <div className="grid gap-6">
                        <Input label="Username" />
                        <Textarea label="Message" />
                      </div>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                      <Button
                        variant="outlined"
                        color="red"
                        onClick={handleOpen}
                      >
                        close
                      </Button>
                      <Button
                        variant="gradient"
                        color="green"
                        onClick={handleOpen}
                      >
                        send message
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </>
              </div>
              <span className="font-semibold text-sm text-gray-dark">
                @{user?.username}
              </span>

              <span>
                {user?.description ? user.description : "description"}
              </span>
              <span>{date}</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 items-center">
                  <span>{user?.followers_count} </span>
                  <span className="font-semibold text-sm text-gray-dark">
                    Followers
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <span>{user?.following_count} </span>
                  <span className="font-semibold text-sm text-gray-dark">
                    Following
                  </span>
                </div>
              </div>
            </div>

            <div>{/* <ProfileTab /> */}</div>
          </div>
          <Divider />
          {posts.map((post) => (
            <FeedItem
              key={post.id}
              tweet={post}
              posts={posts}
              user={user}
              setPosts={setPosts}
              fetchUserProfile={fetchUserProfile}
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

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
  File,
} from "@material-tailwind/react";

function Profile() {
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(userContext);
  const { username } = useParams();
  console.log("USERNAME:", username);
  const [following, setFollowing] = useState(false);

  const handleOpen = () => setOpen(!open);
  //const { user } = useContext(userContext);
  const [posts, setPosts] = useState([]);

  const date = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    fetchUserProfile(username);
  }, [username]); // Add username to the dependency array to re-run the effect when the username changes

  useEffect(() => {
    // Call isFollowing function when the currentUser state changes
    if (currentUser) {
      isFollowing();
    }
  }, [currentUser]);

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

      const { currentUser, tweets } = response.data;

      setPosts(tweets);
      setCurrentUser(currentUser);
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/followers/${currentUser.id}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.followedUser) {
        setFollowing(true);
      }
      fetchUserProfile(username);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:4000/followers/${currentUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.unfollowedUser) {
        setFollowing(false);
      }
      fetchUserProfile(username);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const isFollowing = async () => {
    try {
      const followings = await axios.get("http://localhost:4000/followers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const followers = followings.data.followers;
      const follows = followers.some(
        (follower) => follower.followingId === currentUser.id
      );
      console.log("follows", follows);
      console.log("followers", followers);
      setFollowing(follows);
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };
  console.log("following", following);

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
                  {currentUser?.name}
                </h5>
                <>
                  {currentUser?.username === user.username ? (
                    <>
                      <Button onClick={handleOpen} className="mr-11 h-10 ">
                        Edit Profile
                      </Button>
                      <Dialog open={open} handler={handleOpen}>
                        <div className="flex items-center justify-between ml-[300px]">
                          <DialogHeader>Edit Profile</DialogHeader>
                        </div>
                        <DialogBody divider>
                          <div className="grid gap-6">
                            <Input
                              onChange={(e) => {
                                setCurrentUser({
                                  ...currentUser,
                                  name: e.target.value,
                                });
                              }}
                              label="Username"
                            />
                            <Input
                              onChange={(e) => {
                                setCurrentUser({
                                  ...currentUser,
                                  description: e.target.value,
                                });
                              }}
                              label="Description"
                            />
                            <Input
                              onChange={(e) => {
                                setCurrentUser({
                                  ...currentUser,
                                  birthday: e.target.value,
                                });
                              }}
                              label="Birthday"
                            />
                            <Input
                              onChange={(e) => {
                                setCurrentUser({
                                  ...currentUser,
                                  profile_picture: e.target.value,
                                });
                              }}
                              label="Profile Picture"
                            />
                          </div>
                        </DialogBody>
                        <DialogFooter className="space-x-2">
                          <Button
                            variant="outlined"
                            color="red"
                            onClick={handleOpen}
                          >
                            Close
                          </Button>
                          <Button
                            variant="gradient"
                            color="primary-base"
                            onClick={handleOpen}
                          >
                            Edit
                          </Button>
                        </DialogFooter>
                      </Dialog>
                    </>
                  ) : (
                    <Button
                      className="mr-11 h-10"
                      onClick={following ? handleUnfollow : handleFollow}
                    >
                      {following ? "Unfollow" : "Follow"}
                    </Button>
                  )}
                </>
              </div>
              <span className="font-semibold text-sm text-gray-dark">
                @{currentUser?.username}
              </span>

              <span>
                {currentUser?.description
                  ? currentUser.description
                  : "description"}
              </span>
              <span>{date}</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 items-center">
                  <span>{currentUser?.followers_count} </span>
                  <span className="font-semibold text-sm text-gray-dark">
                    Followers
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <span>{currentUser?.following_count} </span>
                  <span className="font-semibold text-sm text-gray-dark">
                    Following
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <ProfileTab posts={posts} setPosts={setPosts} />
        </div>
        <div className="flex-auto">
          <Layout />
        </div>
      </div>
    </div>
  );
}

export default Profile;

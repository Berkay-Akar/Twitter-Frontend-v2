import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import axios from "axios";
import FeedItem from "../Tweet/FeedItem";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProfileTab({ posts, setPosts }) {
  const [activeTab, setActiveTab] = useState("tweets");
  const { username } = useParams();

  // get liked posts and update active tab
  const getLikedPosts = async () => {
    const response = await axios.get(
      `http://localhost:4000/profile/user/likes/${username}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setPosts(response.data.tweets);
    console.log(response.data.tweets);
    setActiveTab("likes");
  };

  const getPosts = async (username) => {
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
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  const getRetweetedPosts = async () => {
    const response = await axios.get(
      `http://localhost:4000/profile/user/retweets/${username}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setPosts(response.data.tweets);
    console.log(response.data.tweets);
    setActiveTab("retweets");
  };

  const getUserReplies = async () => {
    const response = await axios.get(
      `http://localhost:4000/profile/user/replies/${username}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setPosts(response.data.tweets);
    console.log(response.data.tweets);
    setActiveTab("replies");
  };

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
        }}
      >
        <Tab
          value="tweets"
          onClick={(e) => {
            e.preventDefault();
            getPosts(username);
            setActiveTab("tweets");
          }}
        >
          Tweets
        </Tab>
        <Tab
          value="likes"
          onClick={(e) => {
            e.preventDefault();
            getLikedPosts();
            setActiveTab("likes");
          }}
        >
          Liked Tweets
        </Tab>
        <Tab
          value="retweets"
          onClick={(e) => {
            e.preventDefault();
            getRetweetedPosts();
            setActiveTab("retweets");
          }}
        >
          Retweeted Tweets
        </Tab>
        <Tab
          value="replies"
          onClick={(e) => {
            e.preventDefault();
            getUserReplies();
            setActiveTab("replies");
          }}
        >
          Replies
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value={activeTab} index="tweets">
          {posts.map((post) => (
            <FeedItem
              key={post.id}
              tweet={post}
              posts={posts}
              setPosts={setPosts}
            />
          ))}
        </TabPanel>
        <TabPanel value={activeTab} index="likes">
          {posts.map((post) => (
            <FeedItem
              key={post.id}
              tweet={post}
              posts={posts}
              setPosts={setPosts}
            />
          ))}
        </TabPanel>
        <TabPanel value={activeTab} index="retweets">
          {posts.length === 0 ? (
            <p>User Not Retweeted Any Post</p>
          ) : (
            posts.map((post) => (
              <FeedItem
                key={post.id}
                tweet={post}
                posts={posts}
                setPosts={setPosts}
              />
            ))
          )}
        </TabPanel>
        <TabPanel value={activeTab} index="replies">
          {posts.map((post) => (
            <FeedItem
              key={post.id}
              tweet={post}
              posts={posts}
              setPosts={setPosts}
            />
          ))}
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}

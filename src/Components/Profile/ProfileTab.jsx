import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ProfileTab() {
  const [activeTab, setActiveTab] = React.useState("html");
  const { value, setValue } = useState(0);
  const [tweets, setTweets] = useState([]);
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await axios.get("http://localhost:3001/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.data.posts.length) return;
      setTweets(response.data.posts);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
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
            setActiveTab("tweets");
          }}
        >
          Tweets
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value={activeTab} index="tweets">
          {tweets.map((tweet) => (
            <div key={tweet.post_id}>
              <p>{tweet.post_text}</p>
            </div>
          ))}
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}

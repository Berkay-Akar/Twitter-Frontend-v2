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
  const [activeTab, setActiveTab] = React.useState("tweets");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await axios.get("http://localhost:4000/profile/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTweets(response.data.result);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  console.log(tweets);
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
            <div key={tweet.id}>
              <p>{tweet.content}</p>
            </div>
          ))}
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}

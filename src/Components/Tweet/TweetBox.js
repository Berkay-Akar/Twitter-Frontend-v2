import React, { useContext, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { likePost, deletePost, sendTweet } from "../../functions";
import { userContext } from "../../App";

function TweetBox({ posts, setPosts }) {
  const [tweet, setTweet] = useState("");
  const { user } = useContext(userContext);

  const handleSendTweet = async (e) => {
    e.preventDefault();
    (async () => {
      try {
        // Your async code here
        const sentTweet = await sendTweet(tweet);
        console.log("SENT TWEET:", sentTweet);
        setPosts([sentTweet, ...posts]);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
    setTweet("");
  };

  return (
    <div className="flex-1 flex flex-col mt-2 px-2">
      <textarea
        className="w-full text-xl placeholder-gray-dark outline-none overflow-hidden resize-none bg-transparent"
        placeholder="What's happenning?"
        onChange={(e) => setTweet(e.target.value)}
        value={tweet}
      />
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-lightest">
            <AiOutlinePicture className="w-6 h-6 text-primary-base" />
          </div>
        </div>
        <button
          className="bg-primary-base text-white rounded-full px-4 py-2  font-medium"
          onClick={handleSendTweet}
        >
          Tweet
        </button>
      </div>
    </div>
  );
}

export default TweetBox;

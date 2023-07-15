import React, { useContext, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";

function TweetBox({ sendTweet }) {
  const [tweet, setTweet] = useState("");

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
          onClick={() => {
            sendTweet(tweet);
            setTweet("");
          }}
        >
          Tweet
        </button>
      </div>
    </div>
  );
}

export default TweetBox;

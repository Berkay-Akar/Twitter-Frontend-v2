import React, { useContext, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import axios from "axios";
import { userContext } from "../../App";

function TweetBox() {
  const [tweet, setTweet] = useState("");
  const { user } = useContext(userContext);
  const sendTweet = () => {
    if (tweet.length === 0) {
      alert("Tweet cannot be empty");
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
          if (res.data.error) {
            alert(res.data.error);
            return;
          }
          alert("Tweet Posted");
          setTweet("");
        });
    } catch (error) {
      console.log(error.response.data.error);
    }
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
          onClick={sendTweet}
        >
          Tweet
        </button>
      </div>
    </div>
  );
}

export default TweetBox;

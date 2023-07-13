import React from "react";
import FeedItem from "./FeedItem";

function FeedList({ tweets }) {
  return (
    <div>
      {tweets.map((tweet) => (
        <FeedItem key={tweet.post_id} tweet={tweet} />
      ))}
    </div>
  );
}

export default FeedList;

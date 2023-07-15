import React from "react";
import FeedItem from "./FeedItem";

function FeedList({ tweets, likePost, deletePost }) {
  return (
    <div>
      {tweets.map((tweet) => (
        <FeedItem
          key={tweet.post_id}
          tweet={tweet}
          likePost={likePost}
          deletePost={deletePost}
        />
      ))}
    </div>
  );
}

export default FeedList;

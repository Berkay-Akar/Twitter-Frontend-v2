import React from "react";
import FeedItem from "./FeedItem";

function FeedList({ posts, setPosts }) {
  return (
    <>
      {posts?.map((tweet) =>
        tweet.originalTweetId ? null : (
          <FeedItem
            key={tweet.id}
            tweet={tweet}
            posts={posts}
            setPosts={setPosts}
          />
        )
      )}
    </>
  );
}

export default FeedList;

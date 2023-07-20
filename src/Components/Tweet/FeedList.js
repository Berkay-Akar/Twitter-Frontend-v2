import React from "react";
import FeedItem from "./FeedItem";

function FeedList({ posts, setPosts }) {
  return (
    <>
      {posts?.map((tweet) => (
        <FeedItem
          key={tweet.post.post_id}
          tweet={tweet.post}
          posts={posts}
          setPosts={setPosts}
        />
      ))}
    </>
  );
}

export default FeedList;

import React, { useEffect, useState } from "react";
import FeedItem from "./FeedItem";

function FeedList({ posts, setPosts }) {
  return (
    <>
      {posts?.map((tweet) => (
        <FeedItem
          key={tweet.post_id}
          tweet={tweet}
          posts={posts}
          setPosts={setPosts}
        />
      ))}
    </>
  );
}

export default FeedList;

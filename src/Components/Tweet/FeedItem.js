import React, { useContext } from "react";
import { BiLike } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { userContext } from "../../App";

function FeedItem({ tweet, likePost, deletePost, comments }) {
  const { user } = useContext(userContext);

  return (
    <a href={`/tweet/${tweet.username}/${tweet.post_id}`} rel="noreferrer">
      <article className="flex flex-col shadow my-4">
        <div className="flex items-center ">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Profile"
            className="w-11 h-11 rounded-full ml-4 object-cover"
          />
          <div className="flex  items-center ml-8">
            <span className="font-bold text-md text-black-black">
              {user ? user.full_name : "Unknown User"}
            </span>
            <span className="text-sm text-gray-dark">
              @{user ? user.username : "unknown"}
            </span>
          </div>
        </div>
        <div className=" flex items-start justify-between px-4 py-2 bg-white">
          <p className="text-md text-black-black break-all">
            {tweet.post_text}
          </p>
          <div className="flex flex-col cursor-pointer">
            <BsTrash3 onClick={() => deletePost(tweet.post_id)} />
            <BiLike
              className="w-6 h-6 text-primary-base mb-0 mr-0 hover: cursor-pointer"
              onClick={() => likePost(tweet.post_id)}
            />
            <span className="text-sm text-gray-dark">{tweet.like_count}</span>
          </div>
        </div>
        {/* {comments.length > 0 ? (
          <CommentList comments={comments} posts={tweet} />
        ) : null}
        <Comment />
        <CommentList /> */}
      </article>
    </a>
  );
}

export default FeedItem;

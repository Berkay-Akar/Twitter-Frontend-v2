import React, { useContext } from "react";
import { BiLike } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { userContext } from "../../App";
import { likePost, deletePost } from "../../functions";

function FeedItem({ tweet, posts, setPosts }) {
  const { user } = useContext(userContext);

  const handleLike = async (e) => {
    e.preventDefault();
    (async () => {
      try {
        const likeTweet = await likePost(tweet.post_id);
        const postId = likeTweet.post_id;
        // const updatedPosts = posts.map((post) => {
        //   if (post.post_id === postId) {
        //     post = likeTweet;
        //   }
        //   return post;
        // });
        setPosts((prev) => {
          return prev.map((post) => {
            if (post.post_id === postId) {
              post.like_count = likeTweet.like_count;
            }
            return post;
          });
        });
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    (async () => {
      try {
        // Your async code here
        const deletedTweet = await deletePost(tweet.post_id);
        const postId = deletedTweet.post_id;
        const updatedPosts = posts.filter((post) => {
          return post.post_id !== postId;
        });
        console.log("UPDATED POSTS:", updatedPosts);
        setPosts(updatedPosts);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  };

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
              {tweet.full_name}
            </span>
            <span className="text-sm text-gray-dark">
              @{tweet.username ? tweet.username : "unknown"}
            </span>
          </div>
        </div>
        <div className=" flex items-start justify-between px-4 py-2 bg-white">
          <p className="text-md text-black-black break-all">
            {tweet.post_text}
          </p>
        </div>
        <div className="flex flex-row cursor-pointer items-center">
          <BiLike
            className="w-6 h-6 text-primary-base hover: cursor-pointer  ml-12"
            onClick={handleLike}
          />
          <span className="text-sm text-gray-dark">{tweet.like_count}</span>
          {user.id === tweet.post_user ? (
            <BsTrash3 onClick={handleDelete} className="ml-8" />
          ) : null}
        </div>
      </article>
    </a>
  );
}

export default FeedItem;

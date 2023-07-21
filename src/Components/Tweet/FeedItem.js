import React, { useContext, useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { userContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { likePost, unlikePost, deletePost } from "../../functions";

function FeedItem({ tweet, posts, setPosts }) {
  const { user } = useContext(userContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    getLikedUserByPost();
  }, [tweet]);

  const refetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tweets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const updatedPosts = response.data.posts;

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error refetching posts:", error);
    }
  };

  const getLikedUserByPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/tweets/liked/user/${tweet.post_id}`,
        [tweet.post_id]
      );
      const likedUsers = response.data.users;
      const currentUserID = user.id;

      const currentUserLiked = likedUsers.some((likedUser) => {
        return likedUser.user_id === currentUserID;
      });

      setIsLiked(currentUserLiked);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleLike = async (e) => {
  //   e.preventDefault();

  //   if (tweet.is_liked === true) {
  //     console.log("DELETE::::::::::::::::::::::::::::", tweet.is_liked);
  //     return handleDelete(tweet.post_id);
  //   }

  //   try {
  //     console.log("COUNT:", tweet.like_count);
  //     const likedTweet = await likePost(tweet.post_id);
  //     console.log("post_id", tweet.post_id);
  //     console.log("Like tweet", likedTweet);
  //     const updatedPosts = posts.map((post) =>
  //       post.post_id === likedTweet.post_id ? likedTweet : post
  //     );

  //     setPosts(updatedPosts);
  //     setIsLiked(true);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleUnLike = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(tweet);
  //     const unlikedTweet = await unlikePost(tweet.post_id);
  //     const updatedPosts = posts.map((post) =>
  //       post.post_id === unlikedTweet.post_id ? unlikedTweet : post
  //     );
  //     setPosts(updatedPosts);
  //     setIsLiked(false);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleLike = async (e) => {
    e.preventDefault();

    if (tweet.is_liked) {
      try {
        console.log("tweet.post_id", tweet.post_id);
        const unlikedTweet = await unlikePost(tweet.post_id);
        console.log("unlikedTweet", unlikedTweet);
        const updatedPosts = posts.map((post) =>
          post.post_id === unlikedTweet.post_id ? unlikedTweet : post
        );

        setPosts(updatedPosts);
        setIsLiked(false);
        refetchPosts();
      } catch (error) {
        console.error("Error unliking post:", error);
      }
    } else {
      try {
        const likedTweet = await likePost(tweet.post_id);
        const updatedPosts = posts.map((post) =>
          post.post_id === likedTweet.post_id ? likedTweet : post
        );

        setPosts(updatedPosts);
        setIsLiked(true);
        refetchPosts();
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    (async () => {
      try {
        const deletedTweet = await deletePost(tweet.post_id);
        const postId = deletedTweet.post_id;
        const updatedPosts = posts.filter((post) => {
          return post.post_id !== postId;
        });
        console.log("RESPONSE", deletedTweet);
        setPosts(updatedPosts);
        setIsLiked(false);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  };

  return (
    <Link
      to={`/tweet/${tweet?.user?.username}/${tweet?.post_id}`}
      rel="noreferrer"
    >
      <article className="flex flex-col shadow my-4">
        <div className="flex items-center ">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Profile"
            className="w-11 h-11 rounded-full ml-4 object-cover"
          />
          <div className="flex  items-center ml-8">
            <span className="font-bold text-md text-black-black">
              {tweet?.user?.full_name ? tweet?.user?.full_name : "unknown"}
            </span>
            <span className="text-sm text-gray-dark">
              @{tweet?.user?.username ? tweet?.user?.username : "unknown"}
            </span>
          </div>
        </div>
        <div className=" flex items-start justify-between px-4 py-2 bg-white">
          <p className="text-md text-black-black break-all">
            {tweet.post_text}
          </p>
        </div>
        <div className="flex flex-row cursor-pointer items-center">
          <>
            {!tweet.is_liked ? (
              <AiOutlineHeart
                className="w-6 h-6  hover: cursor-pointer  ml-12 rounded-full hover:w-8 hover:h-8 hover:text-primary-base hover:bg-gray-lightest transform transition-colors duratios-200"
                onClick={handleLike}
              />
            ) : (
              <BsFillHeartFill
                className="w-6 h-6 text-primary-base hover: cursor-pointer  ml-12"
                onClick={handleLike}
              />
            )}
          </>
          <span className="text-sm text-gray-dark">{tweet.like_count}</span>
          {user.id === tweet.post_user ? (
            <BsTrash3 onClick={handleDelete} className="ml-8" />
          ) : null}
        </div>
      </article>
    </Link>
  );
}

export default FeedItem;

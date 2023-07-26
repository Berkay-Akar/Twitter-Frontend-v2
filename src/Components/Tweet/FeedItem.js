import React, { useContext, useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { userContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { likePost, unlikePost, deletePost, retweetPost } from "../../functions";
import moment from "moment";

function FeedItem({ tweet, posts, setPosts }) {
  const { user } = useContext(userContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  useEffect(() => {
    getLikedUserByPost();
  }, [tweet]);

  const refetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/tweets/following",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const updatedPosts = response.data.result;

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error refetching posts:", error);
    }
  };

  const getLikedUserByPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/tweets/liked/user/${tweet.id}`,
        [tweet.id]
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

  const handleLike = async (e) => {
    e.preventDefault();

    const currentUserLiked = isLikedByUser();

    if (currentUserLiked) {
      try {
        const unlikedTweet = await unlikePost(tweet.id);
        const updatedPosts = posts.map((post) =>
          post.id === unlikedTweet.id ? unlikedTweet : post
        );

        setPosts(updatedPosts);
        setIsLiked(false); // Update the isLiked state to false
        refetchPosts();
      } catch (error) {
        console.error("Error unliking post:", error);
      }
    } else {
      try {
        const likedTweet = await likePost(tweet.id);
        const updatedPosts = posts.map((post) =>
          post.id === likedTweet.id ? likedTweet : post
        );
        setPosts(updatedPosts);
        setIsLiked(true); // Update the isLiked state to true
        refetchPosts();
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  function formatTimestamp(created_at) {
    const tweetDate = moment(created_at);
    const currentDate = moment();
    const diffInHours = currentDate.diff(tweetDate, "hours");

    if (diffInHours < 24) {
      return `${diffInHours}s `;
    } else {
      return tweetDate.format("MMMM Do YYYY");
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    (async () => {
      try {
        const deletedTweet = await deletePost(tweet.id);
        const postId = deletedTweet.id;
        const updatedPosts = posts.filter((post) => {
          return post.id !== postId;
        });
        setPosts(updatedPosts);
        setIsLiked(false);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  };

  const handleRetweet = async (e) => {
    e.preventDefault();
    (async () => {
      try {
        const retweetedTweet = await retweetPost(tweet.id);
        const postId = retweetedTweet.id;
        const updatedPosts = posts.map((post) =>
          post.id === postId ? retweetedTweet : post
        );

        setPosts(updatedPosts);
        setIsLiked(false);
        setIsRetweeted(true);
        refetchPosts();
        console.log("isRetweeted:", isRetweeted);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  };

  // check if user liked the post
  const isLikedByUser = () => {
    const likedUsers = tweet.likes.map((like) => like.user.id);
    const currentUserID = user.id;
    const currentUserLiked = likedUsers.includes(currentUserID);
    return currentUserLiked;
  };

  //check if user retweeted the post
  const isRetweetedByUser = () => {
    const retweetedUsers = tweet.retweets.map((retweet) => retweet.user.id);
    const currentUserID = user.id;
    const currentUserRetweeted = retweetedUsers.includes(currentUserID);
    return currentUserRetweeted;
  };

  return (
    <Link
      to={`/tweet/${tweet?.username}/${tweet?.id}`}
      rel="noreferrer"
      className="cursor-pointer"
    >
      <article className="flex flex-col shadow my-4">
        <div className="flex items-center ">
          <Link to={`/${tweet?.username}`} rel="noreferrer">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Profile"
              className="w-11 h-11 rounded-full ml-4 object-cover"
            />
          </Link>

          <div className="flex  items-center ml-8 ">
            <Link to={`/${tweet?.username}`} rel="noreferrer">
              <span className="font-bold text-md text-black-black hover:underline">
                {tweet?.name ? tweet?.name : "unknown"}
              </span>
            </Link>
            <span className="text-sm text-gray-dark">
              @{tweet?.username ? tweet?.username : "unknown"}
            </span>
            <div>
              <span className="text-sm text-gray-dark ml-2">
                {formatTimestamp(tweet.created_at)}
              </span>
            </div>
            <div className="pl-44">
              {user.id === tweet.user_id ? (
                <BsTrash3
                  onClick={handleDelete}
                  className="ml-24  text-red-400"
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className=" flex items-start justify-between px-24 py-2 bg-white">
          <p className="text-md text-black-black break-all">{tweet.content}</p>
        </div>
        <div className="flex flex-row cursor-pointer items-center   justify-around">
          <>
            <div className="flex flex-row items-center gap-1">
              <FaRegComment className="w-6 h-6 text-gray-dark hover: cursor-pointer hover:text-primary-base  ml-12" />
              <span className="text-sm text-gray-dark ">
                {tweet.comments_count}
              </span>
            </div>
            <div className="flex flex-row items-center gap-1">
              {!isRetweetedByUser ? (
                <FaRetweet
                  className="w-6 h-6 text-gray-dark hover: cursor-pointer  hover:text-primary-base  ml-12"
                  onClick={handleRetweet}
                />
              ) : (
                <FaRetweet
                  className="w-6 h-6 text-primary-base hover: cursor-pointer  ml-12"
                  onClick={handleRetweet}
                />
              )}
              <span className="text-sm text-gray-dark">
                {tweet.retweet_count}
              </span>
            </div>
            <div className="flex flex-row items-center gap-1">
              {!isLikedByUser() ? (
                <AiOutlineHeart
                  className="w-6 h-6  hover: cursor-pointer  ml-12 rounded-full  hover:text-primary-base hover:bg-gray-lightest transform transition-colors duratios-200"
                  onClick={handleLike}
                />
              ) : (
                <BsFillHeartFill
                  className="w-6 h-6 text-primary-base hover: cursor-pointer  ml-12"
                  onClick={handleLike}
                />
              )}

              <span className="text-sm text-gray-dark">{tweet.like_count}</span>
            </div>
          </>
        </div>
      </article>
    </Link>
  );
}

export default FeedItem;

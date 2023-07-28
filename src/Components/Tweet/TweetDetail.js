import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";
import Layout from "../Layout/Layout";
import moment from "moment";
import { BsFillHeartFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import FeedItem from "./FeedItem";

function TweetDetail() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { tweetId } = useParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  console.log("POST:", post);
  console.log("USER:", user);

  useEffect(() => {
    getTweetWithComments(tweetId);
  }, [tweetId]);

  const getTweetWithComments = async (tweetId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/tweets/${tweetId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("RESPONSE:", response.data);
      const post = response.data.tweet;
      const user = response.data.tweet.user;
      setComments(response.data.tweet.replies);
      setPost(post);
      setUser(user);
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };
  console.log("COMMENTS:", comments);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/tweets/reply/${tweetId}`,
        {
          content: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            post_id: tweetId,
          },
        }
      );
      const updatedComments = [response.data.comment, ...comments];
      setComments(updatedComments);
      setCommentText("");
    } catch (error) {
      console.log(error.response?.data?.error);
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

  return (
    <div className="flex min-h-screen max-w-7xl mx-auto border w-max">
      <Sidebar />
      <div className="flex flex-col mt-4 w-[480px]">
        <article className="flex flex-col shadow my-4">
          <div className="flex  items-center justify-between w-full px-4">
            <div className="flex items-center gap-2">
              <Link to={`/${post?.user?.username}`} rel="noreferrer">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Profile"
                  className="w-11 h-11 rounded-full  object-cover"
                />
              </Link>
              <Link to={`/${post?.user?.username}`} rel="noreferrer">
                <span className="font-bold text-md text-black-black hover:underline">
                  {post?.user?.name ? post?.user?.name : "unknown"}
                </span>
              </Link>
              <span className="text-sm text-gray-dark">
                @{post?.user?.username ? post?.user?.username : "unknown"}
              </span>
              <div>
                <span className="text-sm text-gray-dark ml-2">
                  {formatTimestamp(post.created_at)}
                </span>
              </div>
            </div>

            <div className="">
              {user.id === post.user_id ? (
                <BsTrash3 className="  text-red-400" />
              ) : null}
            </div>
          </div>

          <div className=" flex items-start justify-between px-10 py-2 bg-white">
            <p className="text-md text-black-black break-all">{post.content}</p>
          </div>
          <div className="flex flex-row cursor-pointer items-center   justify-around">
            <>
              <div className="flex flex-row items-center gap-1">
                <FaRegComment className="w-6 h-6 text-gray-dark hover: cursor-pointer hover:text-primary-base  ml-12" />
                <span className="text-sm text-gray-dark ">
                  {post.comments_count}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <FaRetweet className="w-6 h-6 text-primary-base hover: cursor-pointer  ml-12" />

                <span className="text-sm text-gray-dark">
                  {post.retweet_count}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <AiOutlineHeart className="w-6 h-6  hover: cursor-pointer  ml-12 rounded-full  hover:text-primary-base hover:bg-gray-lightest transform transition-colors duratios-200" />

                <span className="text-sm text-gray-dark">
                  {post.like_count}
                </span>
              </div>
            </>
          </div>
        </article>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Comments</h3>
          <div className="p-4 bg-white rounded-lg shadow">
            <form>
              <input
                //onSubmit={postComment}
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 ml-80 bg-blue-500 text-white rounded-full"
                onClick={postComment}
              >
                Comment
              </button>
            </form>
          </div>
          {comments.map((comment) => (
            // <div
            //   key={comment.id}
            //   className="mt-4 p-4 bg-white rounded-lg shadow"
            // >
            //   <p className="text-gray-600">{comment.content}</p>
            // </div>
            <FeedItem key={comment.id} tweet={comment} />
          ))}
        </div>
      </div>
      <Layout />
    </div>
  );
}

export default TweetDetail;

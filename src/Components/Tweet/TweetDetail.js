import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";
import Layout from "../Layout/Layout";
function TweetDetail({ tweets }) {
  const [tweetDetail, setTweetDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { tweetId } = useParams();

  useEffect(() => {
    getTweetWithComments(tweetId);
  }, [tweetId]);

  useEffect(() => {
    // Fetch comments for the selected tweet
    if (tweetDetail) {
      fetchComments(tweetDetail.post_id);
    }
  }, [tweetDetail]);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/comments/${postId}`
      );
      setComments(response.data.comments);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim() === "") {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/comments",
        {
          comment_text: commentText,
          user_id: tweetDetail.post_user,
          post_id: tweetDetail.post_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Clear the comment input and update comments
      setCommentText("");
      fetchComments(tweetDetail.post_id); // Fetch comments after submitting a new comment
    } catch (error) {
      console.log("Error posting comment:", error);
    }
  };

  const getTweetWithComments = async (tweetId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/posts/tweets/${tweetId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTweetDetail(response.data.post);
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  if (!tweetDetail) {
    return null; // Return null if there's no tweet detail
  }
  console.log("TWEET DETAIL: ", tweetDetail);
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto border">
      <Sidebar />
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{tweetDetail.username}</h3>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">{tweetDetail.post_text}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Comments</h3>
          <div className="p-4 bg-white rounded-lg shadow">
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Post Comment
              </button>
            </form>
          </div>
          {comments.map((comment) => (
            <div
              key={comment.comment_id}
              className="mt-4 p-4 bg-white rounded-lg shadow"
            >
              <p className="text-gray-600">{comment.comment_text}</p>
            </div>
          ))}
        </div>
      </div>
      <Layout />
    </div>
  );
}

export default TweetDetail;

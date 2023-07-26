import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";
import Layout from "../Layout/Layout";
function TweetDetail() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { tweetId } = useParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  console.log("POST:", post);

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

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/comments/${tweetId}`,
        {
          comment_text: commentText,
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

  return (
    <div className="flex min-h-screen max-w-7xl mx-auto border w-max">
      <Sidebar />
      <div className="flex flex-col mt-4 w-[480px]">
        <h3 className="text-xl font-semibold">{user.username}</h3>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">{post.content}</p>
        </div>
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
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={postComment}
              >
                Post Comment
              </button>
            </form>
          </div>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="mt-4 p-4 bg-white rounded-lg shadow"
            >
              <p className="text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Layout />
    </div>
  );
}

export default TweetDetail;

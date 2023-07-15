import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import FeedItem from "../Tweet/FeedItem";

function CommentList({ post }) {
  const [comments, setComments] = useState([]);
  const { user } = useContext(userContext);
  console.log("COMMENTS: ", comments);

  console.log("POST: ", post);

  const getComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/comments`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(comments);

  const sendComment = async (e) => {
    e.preventDefault();
    const data = {
      comment: e.target.comment.value,
      user_id: user.user_id,
      post_id: e.target.post_id.value,
    };
    try {
      const res = await axios.post("http://localhost:3001/comments", data);
      console.log(res.data);
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (comment_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/comments/${comment_id}`
      );
      console.log(res.data);
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={sendComment}>
        <input type="text" name="comment" />
        <input type="hidden" name="post_id" value={post.post_id} />
        <button type="submit">Comment</button>
      </form>
      {comments.map((comment) => {
        return (
          <div key={comment.comment_id}>
            <p>{comment.comment}</p>
            <button onClick={() => deleteComment(comment.comment_id)}>
              Delete
            </button>
          </div>
        );
      })}
      <FeedItem comments={comments} />
    </div>
  );
}

export default CommentList;

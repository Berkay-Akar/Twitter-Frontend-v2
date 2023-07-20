import axios from "axios";

export const sendTweet = async (tweet, user) => {
  if (tweet.length === 0) {
    return;
  }
  try {
    const response = await axios.post(
      "http://localhost:3001/tweets",
      {
        post_user: user.id,
        post_text: tweet,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.post;
  } catch (error) {
    console.log(error.response.data.error);
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/tweets/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("RESPONSE:", response.data);
    if (!response.data) return;
    return response.data.post;
  } catch (error) {
    console.log("Error deleting post:", error);
  }
};

export const likePost = async (postId) => {
  try {
    console.log(localStorage.getItem("token"));
    const response = await axios.post(
      `http://localhost:3001/likes/${postId}`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("RESPONSE:", response.data);
    if (!response.data) return;

    return response.data.post;
  } catch (error) {}
};

export const unlikePost = async (postId) => {
  try {
    console.log(localStorage.getItem("token"));
    const response = await axios.delete(
      `http://localhost:3001/likes/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("RESPONSE:", response.data);
    if (!response.data) return;

    return response.data.post;
  } catch (error) {}
};

export const getTweetWithLikes = async (postId) => {
  try {
    const response = await axios.get(`http://localhost:3001/likes/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("RESPONSE:", response.data);
    if (!response.data) return;
    return response.data.post;
  } catch (error) {
    console.log("Error unliking post:", error);
  }
};

export const getTweetForUser = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/likes/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("RESPONSE:", response.data);
    if (!response.data) return;
    return response.data.post;
  } catch (error) {
    console.log("Error unliking post:", error);
  }
};

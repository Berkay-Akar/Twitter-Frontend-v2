import axios from "axios";

export const sendTweet = async (tweet) => {
  if (tweet.length === 0) {
    return;
  }
  try {
    const response = await axios.post(
      "http://localhost:4000/tweets",
      {
        content: tweet,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.tweet;
  } catch (error) {
    console.log(error.response.data.error);
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/tweets/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.data) return;
    return response.data.deletedTweet;
  } catch (error) {
    console.log("Error deleting post:", error);
  }
};

export const likePost = async (postId) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/tweets/like/${postId}`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.data.likedTweet) return null; // Handle case when response data is empty
    return response.data.likedTweet;
  } catch (error) {
    console.error("Error liking post:", error);
    return null;
  }
};

export const unlikePost = async (postId) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/tweets/like/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.data.unlikedTweet) return;

    return response.data.unlikedTweet;
  } catch (error) {}
};

// retweet a tweet
export const retweetPost = async (postId) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/tweets/retweet/${postId}`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("RESPONSE:", response);
    if (!response.data) return null;
    return response.data;
  } catch (error) {
    console.error("Error retweeting post:", error);
    return null;
  }
};

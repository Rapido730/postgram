import axios from "axios";

const Server_URL = process.env.REACT_APP_SERVER_URL;
console.log(Server_URL);

export const createPost = async (token, title, body) => {
  try {
    const response = await axios.post(Server_URL + "post/createpost", {
      token,
      title,
      body,
    });

    if (response.status === 200) {
      return { post: response.data.Post, message: "" };
    } else {
      return { post: null, message: response.data.message };
    }
  } catch (error) {
    return { post: null, message: error.message };
  }
};

export const getPost = async (token, post_id) => {
  try {
    const response = await axios.post(Server_URL + "post/getpost", {
      token,
      post_id,
    });

    if (response.status === 200) {
      return { post: response.data.post, message: "" };
    } else {
      return { post: null, message: response.data.message };
    }
  } catch (error) {
    return { post: null, message: error.message };
  }
};

export const getPostList = async (token) => {
  try {
    const response = await axios.post(Server_URL + "post/getpostlist", {
      token,
    });

    if (response.status === 200) {
      return { posts: response.data.posts, message: "" };
    } else {
      return { posts: null, message: response.data.message };
    }
  } catch (error) {
    return { posts: null, message: error.message };
  }
};

export const getAllPostList = async (token) => {
  try {
    const response = await axios.post(Server_URL + "post/getallpostlist", {
      token,
    });
    console.log(response)
    if (response.status === 200) {
      return { posts: response.data.posts, message: "" };
    } else {
      return { posts: null, message: response.data.message };
    }
  } catch (error) {
    return { posts: null, message: error.message };
  }
};

export const addComment = async (token, post_id, body) => {
  try {
    const response = await axios.post(Server_URL + "post/addcomment", {
      token,
      post_id,
      body,
    });

    if (response.status === 200) {
      return { Comment: response.data.Comment, message: "" };
    } else {
      return { Comment: null, message: response.data.message };
    }
  } catch (error) {
    return { Comment: null, message: error.message };
  }
};

export const addReply = async (token, body, post_id, comment_id) => {
  try {
    const response = await axios.post(Server_URL + "post/addReply", {
      token,
      post_id,
      body,
      comment_id,
    });

    if (response.status === 200) {
      return { Reply: response.data.Reply, message: "" };
    } else {
      return { Reply: null, message: response.data.message };
    }
  } catch (error) {
    return { Reply: null, message: error.message };
  }
};

import { useState, useEffect } from "react";
import { getAllPostList } from "../services/post";
import { useSelector, useDispatch } from "react-redux";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import { SetPostList } from "../reduxStore/reducers/post";
import { Routes, Route, useNavigate } from "react-router-dom";
import Post from "./Post";

const Dashboard = () => {
  const Dispatch = useDispatch();
  let params = new URLSearchParams(document.location.search);
  const param_option = params.get("option");
  const [Option, SetOption] = useState(param_option || "0");
  const User = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    console.log({ Option });
    SetOption(param_option);
  }, [param_option]);

  useEffect(() => {
    if (User)
      getAllPostList(User.token).then(({ posts, message }) => {
        if (posts) {
          Dispatch(SetPostList(posts));
        } else {
          console.log({ message });
        }
      });
  }, [User]);

  const optionChangeHandler = (event, option_choice) => {
    navigate(`/posts?option=${option_choice}`);
  };

  return (
    <div id="post-page">
      <div id="options">
        <button
          onClick={(event) => {
            optionChangeHandler(event, 0);
          }}
        >
          {"All Post"}
        </button>
        <button>{"Commented Post"}</button>
        <button>{"Replied Post"}</button>
        <button
          id="create-post-btn"
          onClick={(event) => {
            optionChangeHandler(event, 1);
          }}
        >
          {"Create Post"}
        </button>
      </div>
      <div id="workplace">
        <Routes>
          <Route
            index
            element={Option == 0 ? <PostList /> : <CreatePost />}
          ></Route>
          <Route path=":post_id" element={<Post />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;

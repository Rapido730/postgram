import { useState, useEffect } from "react";
import { getAllPostList } from "../services/post";
import { useSelector, useDispatch } from "react-redux";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import { SetPostList } from "../reduxStore/reducers/post";
import { Routes, Route, useNavigate } from "react-router-dom";
import Post from "./Post";
import CommentedPostList from "./CommentedPost";
import RepliedPostList from "./RepliedPost";

const Dashboard = () => {
  const Dispatch = useDispatch();
  let params = new URLSearchParams(document.location.search);
  const param_option = params.get("option");
  const [Option, SetOption] = useState("0");
  const User = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (User)
      getAllPostList(User.token).then(({ posts, message }) => {
        if (posts) {
          Dispatch(SetPostList(posts));
        } else {
          //console.log({ message });
        }
      });
  }, [User]);

  useEffect(() => {
    SetOption(param_option);
  }, [param_option]);

  const optionChangeHandler = (event, option_choice) => {
    navigate(`/posts?option=${option_choice}`);
  };

  const TabElement = (Option) => {
    switch (Option) {
      case "1":
        return <CommentedPostList />;
      case "2":
        return <RepliedPostList />;
      case "3":
        return <CreatePost />;
      default:
        return <PostList />;
    }
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
        <button
          onClick={(event) => {
            optionChangeHandler(event, 1);
          }}
        >
          {"Commented Post"}
        </button>
        <button
          onClick={(event) => {
            optionChangeHandler(event, 2);
          }}
        >
          {"Replied Post"}
        </button>
        <button
          id="create-post-btn"
          onClick={(event) => {
            optionChangeHandler(event, 3);
          }}
        >
          {"Create Post"}
        </button>
      </div>
      <div id="workplace">
        <Routes>
          <Route index element={TabElement(Option)}></Route>
          <Route path=":post_id" element={<Post />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;

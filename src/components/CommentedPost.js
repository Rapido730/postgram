import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getCommentedPostList } from "../services/post";
import { AddCommentedPostList } from "../reduxStore/reducers/post";

const CommentedPostList = () => {
  const dispatch = useDispatch();

  const [PostsData, SetPostData] = useState([]);
  const User = useSelector((state) => state.user);

  useEffect(() => {
    getCommentedPostList(User.token).then((response) => {
      dispatch(AddCommentedPostList(response.posts));
    });
  });

  const PostList = useSelector((state) => state.post.CommentedPost);

  useEffect(() => {
    SetPostData(PostList);
  }, [PostList]);

  return (
    <div id="post-list">
      <h3>{"Commented Posts (" + PostsData.length + ")"}</h3>
      <ul>
        {PostsData.map((post) => (
          <li key={post._id}>
            <Link id="post-link" to={"/posts/" + post._id.toString()}>
              <h3>{post.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentedPostList;

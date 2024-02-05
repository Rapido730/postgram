import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getRepliedPostList } from "../services/post";
import { AddRepliedPostList } from "../reduxStore/reducers/post";

const RepliedPostList = () => {
  const dispatch = useDispatch();

  const [PostsData, SetPostData] = useState([]);
  const User = useSelector((state) => state.user);

  useEffect(() => {
    getRepliedPostList(User.token).then((response) => {
      dispatch(AddRepliedPostList(response.posts));
    });
  });

  const PostList = useSelector((state) => state.post.RepliedPost);

  useEffect(() => {
    SetPostData(PostList);
  }, [PostList]);

  return (
    <div id="post-list">
      <h3>{"Replied Posts (" + PostsData.length + ")"}</h3>
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

export default RepliedPostList;

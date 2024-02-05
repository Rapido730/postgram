import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostList } from "../services/post";
import { useNavigate, Link } from "react-router-dom";
import { SetPostList } from "../reduxStore/reducers/post";

const PostList = () => {
  const Dispatch = useDispatch();
  const [PostsData, SetPostData] = useState([]);
  const User = useSelector((state) => state.user);

  const PostList = useSelector((state) => state.post.AllPost);

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
    SetPostData(PostList);
  }, [PostList]);

  return (
    <div id="post-list">
      <h3>{"All Posts (" + PostsData.length + ")"}</h3>
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

export default PostList;

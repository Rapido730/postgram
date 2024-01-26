import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const PostList = () => {
  const navigate = useNavigate();
  const [PostsData, SetPostData] = useState([]);

  const PostList = useSelector((state) => state.post);

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

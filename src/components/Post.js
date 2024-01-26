import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import { getPost } from "../services/post";

const Post = () => {
  const { post_id } = useParams();
  const [PostData, SetPostData] = useState(null);
  const User = useSelector((state) => state.user);
  const PostList = useSelector((state) => state.post);
  //console.log({ post_id });

  useEffect(() => {
    if (User && post_id&&PostList) {
      const post = PostList.filter((post) => post._id === post_id)[0];
      SetPostData(post);
    }
  }, [User, post_id, PostList]);

  return (
    <div>
      {PostData ? (
        <div id="post">
          <h3>{PostData.title}</h3>
          <p>{PostData.body}</p>
          <p id="stats">
            {`${PostData.comment_count} Comment    ${PostData.reply_count} Reply`}{" "}
          </p>
          <Comments Post={PostData} />
        </div>
      ) : (
        <div>no data</div>
      )}
    </div>
  );
};

export default Post;

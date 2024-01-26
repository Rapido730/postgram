import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import { getPost } from "../services/post";

const Post = () => {
  const { post_id } = useParams();
  const [PostData, SetPostData] = useState(null);
  const User = useSelector((state) => state.user);
  //console.log({ post_id });

  useEffect(() => {
    if (User && post_id) {
      getPost(User.token, post_id).then(({ post, message }) => {
        if (post) {
          SetPostData(post);
        }
      });
    }
  }, [User, post_id]);

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

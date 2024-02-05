import { useEffect, useState } from "react";
import { getReplyList } from "../services/post";
import { useSelector } from "react-redux";

const ReplyList = ({ Comment }) => {
  const [Replies, SetReplies] = useState([]);
  const User = useSelector((state) => state.user);
  useEffect(() => {
    getReplyList(User.token, Comment._id).then(({ replies, message }) => {
      SetReplies(replies);
    });
  }, [Comment]);

  return (
    <div id="reply_list">
      {Replies.map((reply) => (
        <li key={reply._id}>
          <span>
            {" "}
            {reply.author_id} {" : "}{" "}
          </span>
          <span> {reply.body} </span>
        </li>
      ))}
    </div>
  );
};

export default ReplyList;

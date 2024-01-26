import axios from "axios";
import { useState, useEffect } from "react";
import { addComment } from "../services/post";
import { useSelector } from "react-redux";
import post from "../reduxStore/reducers/post";

const Comments = ({ Post }) => {
  const [CommentField, SetCommentField] = useState({ IsOpen: false, body: "" });
  const [ReplyField, SetReplyField] = useState({ IsOpen: false, body: "" });
  const User = useSelector((state) => state.user);

  useEffect(() => {
    SetCommentField((prev) => ({ ...prev, IsOpen: false }));
  }, [Post]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    SetCommentField((prev) => ({ ...prev, [name]: value }));
  };
  // //console.log(Post._id);
  const OnCommentSubmitHandler = (event) => {
    event.preventDefault();
    addComment(User.token, Post._id, CommentField.body).then((response) => {
      SetCommentField((prev) => ({ ...prev, IsOpen: false }));
    });
  };

  return (
    <div id="comments">
      <h4>Comments</h4>
      <ul>
        <li>
          {CommentField.IsOpen ? (
            <form onSubmit={OnCommentSubmitHandler}>
              <input
                name={"body"}
                placeholder="Write your thoughts..."
                onChange={onChangeHandler}
                value={CommentField.body}
              ></input>
              <button type="submit">Submit</button>
            </form>
          ) : (
            <button
              onClick={() => {
                SetCommentField((prev) => ({ ...prev, IsOpen: true }));
              }}
            >
              Write a comment
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Comments;

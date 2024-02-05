import axios from "axios";
import { useState, useEffect } from "react";
import { addComment, getCommentList } from "../services/post";
import { useDispatch, useSelector } from "react-redux";
import post, { IncrementCommentCount } from "../reduxStore/reducers/post";
import Comment from "./Comment";

const CommentList = ({ Post }) => {
  const [CommentField, SetCommentField] = useState({
    IsOpen: false,
    body: "",
    IsProcessing: false,
  });
  const [ReplyField, SetReplyField] = useState({ IsOpen: false, body: "" });
  const [CommentList, SetCommentList] = useState([]);
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const GetCommentList = () => {
    getCommentList(User.token, Post._id).then(({ comments, message }) => {
      SetCommentList(comments);
    });
  };

  useEffect(() => {
    SetCommentField((prev) => ({
      ...prev,
      IsOpen: false,
      IsProcessing: false,
    }));
    GetCommentList();
  }, [Post]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    SetCommentField((prev) => ({ ...prev, [name]: value }));
  };
  // //console.log(Post._id);
  const OnCommentSubmitHandler = (event) => {
    event.preventDefault();
    SetCommentField((prev) => ({ ...prev, IsProcessing: true }));
    addComment(User.token, Post._id, CommentField.body).then((response) => {
      SetCommentField((prev) => ({ ...prev, IsOpen: false, body: "" }));
      dispatch(IncrementCommentCount(Post));
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
                required
                disabled={CommentField.IsProcessing}
              ></input>
              <button disabled={CommentField.IsProcessing} type="submit">
                {!CommentField.IsProcessing ? "Submit" : "Wait..."}
              </button>
            </form>
          ) : (
            <button
              onClick={() => {
                SetCommentField((prev) => ({ ...prev, IsOpen: true }));
              }}
            >
              {"Write a comment"}
            </button>
          )}
        </li>
        {CommentList.map((comment) => (
          <Comment post={Post} comment_data={comment} />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

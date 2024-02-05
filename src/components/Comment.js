import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReply } from "../services/post";
import { IncrementReplyCount } from "../reduxStore/reducers/post";
import ReplyList from "./ReplyList";

const Comment = ({ post, comment_data }) => {
  const [ReplyField, SetReplyField] = useState({
    IsOpen: false,
    IsProcessing: false,
    body: "",
  });

  const dispatch = useDispatch();

  const User = useSelector((state) => state.user);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    SetReplyField((prev) => ({ ...prev, [name]: value }));
  };

  const OnReplySubmitHandler = (event) => {
    event.preventDefault();
    SetReplyField((prev) => ({ ...prev, IsProcessing: true }));
    addReply(User.token, ReplyField.body, post._id, comment_data._id).then(
      (response) => {
        SetReplyField((prev) => ({
          ...prev,
          IsOpen: false,
          body: "",
          IsProcessing: false,
        }));
        dispatch(IncrementReplyCount(post));
      }
    );
  };

  return (
    <li id="comment" key={comment_data._id}>
      <div>
        <span>{comment_data.author_id} </span>
        <span>
          {": "} {comment_data.body}
        </span>
        <br></br>

        <button
          id="reply_button"
          onClick={() => {
            SetReplyField((prev) => ({ ...prev, IsOpen: true }));
          }}
        >
          Reply
        </button>
      </div>
      <br></br>
      <div>
        <span>
          {ReplyField.IsOpen ? (
            <form onSubmit={OnReplySubmitHandler}>
              <input
                name={"body"}
                placeholder="Write your reply..."
                onChange={onChangeHandler}
                value={ReplyField.body}
                required
                disabled={ReplyField.IsProcessing}
              ></input>
              <button disabled={ReplyField.IsProcessing} type="submit">
                {!ReplyField.IsProcessing ? "Submit" : "Wait..."}
              </button>
            </form>
          ) : (
            <div></div>
          )}
        </span>
      </div>

      <ReplyList Comment={comment_data} />
    </li>
  );
};

export default Comment;

import { createSlice } from "@reduxjs/toolkit";

const InitialState = { AllPost: [], CommentedPost: [], RepliedPost: [] };

export const postSlice = createSlice({
  name: "Post",
  initialState: InitialState,
  reducers: {
    SetPostList: (state, action) => {
      return { ...state, AllPost: action.payload };
    },
    AddPost: (state, action) => {
      const { AllPost } = state;
      const { payload } = action;
      const NewState = [...AllPost];
      NewState.push(payload);
      return { ...state, AllPost: NewState };
    },
    AddCommentedPostList: (state, action) => {
      const { AllPost, CommentedPost, RepliedPost } = state;
      const { payload } = action;
      return { AllPost, CommentedPost: payload, RepliedPost };
    },
    AddRepliedPostList: (state, action) => {
      const { AllPost, CommentedPost, RepliedPost } = state;
      const { payload } = action;
      return { AllPost, CommentedPost, RepliedPost: payload };
    },
    IncrementCommentCount: (state, action) => {
      const { AllPost, CommentedPost, RepliedPost } = state;
      const { payload } = action;
      const NewState1 = AllPost.map((post) =>
        post._id === payload._id
          ? { ...post, comment_count: post["comment_count"] + 1 }
          : post
      );
      const NewState2 = CommentedPost.map((post) =>
        post._id === payload._id
          ? { ...post, comment_count: post["comment_count"] + 1 }
          : post
      );
      const NewState3 = RepliedPost.map((post) =>
        post._id === payload._id
          ? { ...post, comment_count: post["comment_count"] + 1 }
          : post
      );
      return {
        ...state,
        AllPost: NewState1,
        CommentedPost: NewState2,
        RepliedPost: NewState3,
      };
    },
    IncrementReplyCount: (state, action) => {
      const { AllPost, CommentedPost, RepliedPost } = state;
      const { payload } = action;
      const NewState1 = AllPost.map((post) =>
        post._id === payload._id
          ? { ...post, reply_count: post["reply_count"] + 1 }
          : post
      );
      const NewState2 = CommentedPost.map((post) =>
        post._id === payload._id
          ? { ...post, reply_count: post["reply_count"] + 1 }
          : post
      );

      const NewState3 = RepliedPost.map((post) =>
        post._id === payload._id
          ? { ...post, reply_count: post["reply_count"] + 1 }
          : post
      );

      return {
        ...state,
        AllPost: NewState1,
        CommentedPost: NewState2,
        RepliedPost: NewState3,
      };
    },
    DeletePost: (state, action) => {
      const { payload } = action;
      const NewState = state.filter((post) => post._id !== payload._id);

      return NewState;
    },
  },
});

export const {
  SetPostList,
  AddPost,
  DeletePost,
  IncrementCommentCount,
  IncrementReplyCount,
  AddCommentedPostList,
  AddRepliedPostList,
} = postSlice.actions;
export default postSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const InitialState = [];

export const postSlice = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {
    SetPostList: (state, action) => {
      return action.payload;
    },
    AddPost: (state, action) => {
      const { payload } = action;
      const NewState = state;
      NewState.push(payload);
      return NewState;
    },
    IncrementCommentCount: (state, action) => {
      const { payload } = action;
      const NewState = state.map((post) =>
        post._id === payload._id
          ? { ...post, comment_count: post["comment_count"] + 1 }
          : post
      );
      return NewState;
    },
    DeletePost: (state, action) => {
      const { payload } = action;
      const NewState = state.filter((post) => post._id !== payload._id);

      return NewState;
    },
  },
});

export const { SetPostList, AddPost, DeletePost,IncrementCommentCount } = postSlice.actions;
export default postSlice.reducer;
